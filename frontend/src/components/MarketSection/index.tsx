import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { APIResponse, api } from "@/api";
import { Button, Chip } from "@/components/primitives";
import { ChipColor } from "@/components/primitives/Chip";
import { Market } from "@/types";

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
        setMarkets(Object.values(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching markets:", error);
      });
  }, []);

  const getMarketStatus = (market: Market): MarketStatus => {
    const isOpen = new Date(market.openOn) < new Date() && new Date(market.closeOn) > new Date();
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
      return new Date(market.openOn) < now;
    })
    .sort((a, b) => new Date(b.openOn).getTime() - new Date(a.openOn).getTime());

  // Pagination logic
  const totalPages = Math.ceil(displayedMarkets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMarkets = displayedMarkets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-extrabold">Make Your Prediction</h2>
      <div className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
        <section>
          {currentMarkets.map((market) => {
            const status = getMarketStatus(market);
            const chipText = getChipText(status);
            const chipColor = getChipColor(status);

            return (
              <div
                key={market.id}
                className="grid grid-cols-4 items-center px-4 py-2 border-b border-neutral-300 last:border-b-0"
              >
                <p className="text-base font-medium">
                  {new Date(market.openOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
                <p className="text-base font-medium">{market.name}</p>
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
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, displayedMarkets.length)}</span> of{" "}
                <span className="font-medium">{displayedMarkets.length}</span> results
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