import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { APIResponse, api } from "@/api";
import { Button, Chip } from "@/components/primitives";
import { ChipColor } from "@/components/primitives/Chip";
import { Market } from "@/types";
import { dateTransformer } from "@/utils/dateTransformer";

enum MarketStatus {
  PENDING = "pending",
  ANSWERED = "answered",
  CORRECT = "correct",
  INCORRECT = "incorrect",
  CLOSED = "closed",
}

const MarketSection = () => {
  const navigate = useNavigate();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    api
      .get<APIResponse<Market[]>>("/markets")
      .then((response) => {
        const transformedMarkets = Object.values(response.data.data).map(market =>
          dateTransformer(market, ['openOn', 'closeOn', 'createdAt', 'updatedAt'])
        );
        setMarkets(transformedMarkets);
      })
      .catch((error) => {
        console.error("Error fetching markets:", error);
      });
  }, []);

  const getMarketStatus = (market: Market): MarketStatus => {
    const isOpen = market.openOn < new Date() && market.closeOn > new Date();
    if (!market.hasAnswered) {
      return isOpen ? MarketStatus.PENDING : MarketStatus.CLOSED;
    }
    if (market.resolution === null) {
      return MarketStatus.ANSWERED;
    }
    return market.isCorrect ? MarketStatus.CORRECT : MarketStatus.INCORRECT;
  };

  const getChipText = (status: MarketStatus): string => {
    switch (status) {
      case MarketStatus.PENDING:
        return "Pending";
      case MarketStatus.ANSWERED:
        return "Answered";
      case MarketStatus.CORRECT:
        return "Correct";
      case MarketStatus.INCORRECT:
        return "Incorrect";
      case MarketStatus.CLOSED:
        return "Closed";
    }
  };

  const getChipColor = (status: MarketStatus): ChipColor => {
    switch (status) {
      case MarketStatus.PENDING:
        return "blue";
      case MarketStatus.ANSWERED:
        return "yellow";
      case MarketStatus.CORRECT:
        return "green";
      case MarketStatus.INCORRECT:
        return "red";
      case MarketStatus.CLOSED:
        return "gray";
    }
  };

  const displayedMarkets = markets
    .filter((market) => {
      const now = new Date();
      return market.openOn < now;
    })
    .sort((a, b) => b.openOn.getTime() - a.openOn.getTime());

  // Pagination logic
  const totalPages = Math.ceil(displayedMarkets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMarkets = displayedMarkets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="font-nunito duolingo-heading text-xl font-extrabold">Make Your Prediction</h2>
      <div className="duolingo-card flex flex-col justify-between">
        <section>
          <div className="hidden md:grid grid-cols-5 items-center px-4 py-2 border-b border-neutral-300 font-nunito font-bold text-gray-600">
            <span>Date</span>
            <span className="col-span-1">Market</span>
            <span className="text-center">Net Winnings</span>
            <span className="text-center">Status</span>
            <span className="text-center">Action</span>
          </div>
          {currentMarkets.map((market) => {
            const status = getMarketStatus(market);
            const chipText = getChipText(status);
            const chipColor = getChipColor(status);
            const winnings = market.winnings;

            return (
              <div
                key={market.id}
                className="duolingo-interactive grid grid-cols-3 md:grid-cols-5 items-center px-4 py-2 border-b border-neutral-300 last:border-b-0 rounded-lg mx-2 my-1"
              >
                <p className="font-nunito text-base font-bold hidden md:block">
                  {market.openOn.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
                <p className="font-nunito text-base font-bold col-span-1">{market.name}</p>
                <div className="flex justify-center items-center gap-1">
                  {winnings != null && (
                    <>
                      <img src="/images/coin.svg" alt="coin" className="w-4 h-4" />
                      <span className={`font-nunito font-bold ${winnings >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {winnings >= 0 ? `+${winnings}` : winnings}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex justify-center">
                  <Chip text={chipText} color={chipColor} />
                </div>
                <div className="flex justify-end">
                  <Button
                    text="Enter"
                    color="green"
                    onClick={() => navigate(`/question/${market.id}`)}
                    className="w-32"
                  />
                </div>
              </div>
            );
          })}
        </section>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <p className="font-nunito text-sm text-gray-700">
                Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-semibold">{Math.min(indexOfLastItem, displayedMarkets.length)}</span> of{" "}
                <span className="font-semibold">{displayedMarkets.length}</span> results
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                text="Previous"
                size="medium"
              />
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                text="Next"
                size="medium"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSection;