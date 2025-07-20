import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { APIResponse, api } from "@/api";
import CoinSlider from "@/components/CoinSlider";
import { Button } from "@/components/primitives";
import { MarketWithUserSpecificData } from "@/types/market";

import BackButton from "../../components/Buttons/BackButton/BackButton";
import GaugeComponent from "../../components/GaugeComponent";

const Question = ({ market, marketId }: { market: MarketWithUserSpecificData; marketId: string }) => {
  const [userAnswer, setUserAnswer] = useState<boolean | null>(market.userAnswer ?? null);
  const [coins, setCoins] = useState(market.userBetAmount ?? 10);

  const marketIsOpen = new Date(market.openOn) < new Date() && new Date(market.closeOn) > new Date();

  const handlerPlaceBet = () => {
    api
      .post(`/markets/${marketId}/bets`, {
        betOutcome: userAnswer,
        betAmount: coins,
      })
      .then(() => {
        toast(
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-8 w-8 text-green-500" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Bet placed successfully! Refreshing the page to update status...
          </span>
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Delay reload by 2 seconds so the toast is visible
      })
      .catch((error) => {
        toast.error(`Failed to place bet: ${error.response.data.message}`);
      });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl md:max-w-2xl place-items-center place-content-center rounded-2xl border border-neutral-300 bg-white p-3 sm:p-6 shadow mx-auto">
      <div className="flex flex-col gap-4 place-items-center place-content-center h-full w-full">
        <p className="max-w-2xl pb-2 text-center text-base sm:text-2xl font-semibold">{market.question}</p>
         {marketIsOpen && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full justify-center items-center">
            <div className="flex flex-row w-full justify-center gap-2 sm:gap-6 max-w-xs sm:max-w-none">
              <Button
                variant={userAnswer === true ? "primary" : "secondary"}
                color="green"
                onClick={() => setUserAnswer(true)}
                text="Yes"
                className="w-2/3 sm:w-48 sm:h-12 text-base sm:text-xl"
                size="medium"
              />
              <Button
                variant={userAnswer === false ? "primary" : "secondary"}
                color="red"
                onClick={() => setUserAnswer(false)}
                text="No"
                className="w-2/3 sm:w-48 sm:h-12 text-base sm:text-xl"
                size="medium"
              />
            </div>
          </div>
        )}
        {marketIsOpen && userAnswer !== null && (
          <>
            <p className="pb-2 sm:pb-4 text-center text-sm sm:text-base font-semibold">How many coins will you wager on your answer?</p>
            <div className="w-52 sm:w-[400px] flex justify-center">
              <CoinSlider value={coins} onChange={setCoins} />
            </div>
          </>
        )}
        {!marketIsOpen && <p className="font-semibold text-sm sm:text-lg">This market is not open for betting.</p>}
      </div>
      {userAnswer !== null && (
        <ConfirmationBox
          userAnswer={userAnswer}
          coins={coins}
          handlePlaceBet={handlerPlaceBet}
          allowBet={marketIsOpen}
          betChangeCount={market.userBetChangeCount}
        />
      )}
    </div>
  );
};

const ConfirmationBox = ({
  userAnswer,
  coins,
  handlePlaceBet,
  allowBet,
  betChangeCount,
}: {
  userAnswer: boolean;
  coins: number;
  handlePlaceBet: () => void;
  allowBet: boolean;
  betChangeCount?: number;
}) => (
  <div className="relative flex flex-col rounded-2xl border-2 border-sky-500 bg-sky-50 p-3 sm:p-4 shadow-sm w-full mt-auto">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <p className="text-base sm:text-lg">
        Your answer: <strong>{userAnswer ? "Yes" : "No"}</strong>
      </p>
      <div className="text-base sm:text-lg text-gray-600">
        Bet Changes: <strong>{betChangeCount}</strong>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-2">
      <div className="text-base flex items-center gap-1">
        Cost: <img src="/images/coin.svg" alt="coin" className="w-5 h-5" />
        <strong>
          {coins} coin{coins > 1 ? "s" : ""}
        </strong>
      </div>
      {allowBet && (
        <Button
          variant="secondary"
          color="blue"
          text="Confirm"
          className="w-full sm:w-36"
          size="small"
          onClick={handlePlaceBet}
        />
      )}
    </div>
  </div>
);

const MarketStats = ({ yesCount, noCount }: { yesCount: number; noCount: number }) => (
  <div className="flex w-full max-w-xs sm:max-w-[50%] flex-col items-center justify-between rounded-2xl border border-neutral-300 bg-white p-3 sm:p-6 shadow mx-auto">
    <p className="font-semibold text-base sm:text-2xl">See how others have voted</p>
    {yesCount + noCount > 0 ? (
      <GaugeComponent yesCount={yesCount} noCount={noCount} />
    ) : (
      <span className="text-neutral-500 text-sm sm:text-lg">No data</span>
    )}
    <div className="flex w-full flex-row justify-between mt-2">
      <div className="flex gap-2 place-items-center">
        <div className="rounded-full bg-lime-600 w-5 h-5 sm:w-6 sm:h-6" />
        <div className="font-semibold text-base sm:text-xl">{yesCount} Yes</div>
      </div>
      <div className="flex gap-2 place-items-center">
        <div className="rounded-full bg-red-500 w-5 h-5 sm:w-6 sm:h-6" />
        <div className="font-semibold text-base sm:text-xl">{noCount} No</div>
      </div>
    </div>
  </div>
);

function QuestionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [marketData, setMarketData] = useState<MarketWithUserSpecificData | null>(null);
  const [coinBalance, setCoinBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get<APIResponse<MarketWithUserSpecificData>>(`/markets/${id}`).then((response) => {
      setMarketData(response.data.data);
    });

    api.get<APIResponse<number>>("/users/coins").then((response) => {
      setCoinBalance(response.data.data);
    });
  }, [id]);

  if (!marketData || !id) {
    return <p>Market not found</p>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-5 bg-gray-100 p-4 sm:p-16">
      <div className="max-w-7xl w-full flex flex-col gap-8">
        <BackButton onClick={() => navigate("/dashboard")} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Today's Topic: {marketData.name}</h1>
          {/* Balance below topic on mobile, right on desktop */}
          <div className="flex sm:hidden w-full justify-center">
            {coinBalance !== null && (
              <div className="flex items-center gap-2 text-base font-semibold bg-white rounded-xl px-4 py-2 shadow border border-neutral-200 mt-2">
                Balance:
                <img src="/images/coin.svg" alt="coin" className="w-5 h-5" />
                <span>{coinBalance}</span>
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2 text-lg font-semibold bg-white rounded-xl px-4 py-2 shadow border border-neutral-200">
            {coinBalance !== null && (
              <>
                Balance:
                <img src="/images/coin.svg" alt="coin" className="w-5 h-5" />
                <span>{coinBalance}</span>
              </>
            )}
          </div>
        </div>
        <section className="flex flex-col md:flex-row gap-4 min-h-[30vh]">
          <Question market={marketData} marketId={id} />
          <MarketStats yesCount={marketData.totalYes} noCount={marketData.totalNo} />
        </section>
      </div>
    </div>
  );
}

export default QuestionPage;