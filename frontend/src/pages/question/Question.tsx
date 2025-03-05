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

  const userHasAnswered = market.userAnswer != null;
  const marketIsOpen = new Date(market.openOn) < new Date() && new Date(market.closeOn) > new Date();

  const handlerPlaceBet = () => {
    api
      .post(`/markets/${marketId}/bets`, {
        betOutcome: userAnswer,
        betAmount: coins,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(`Failed to place bet: ${error.response.data.message}`);
      });
  };

  return (
    <div className="flex flex-col gap-4 w-full place-items-center place-content-center rounded-2xl border border-neutral-300 bg-white p-6 shadow">
      <div className="flex flex-col gap-4 place-items-center place-content-center h-full">
        <p className="max-w-2xl pb-2 text-center text-2xl font-semibold">{market.question}</p>
        {marketIsOpen && (
          <div className="flex gap-4">
            <Button
              variant={userAnswer === true ? "primary" : "secondary"}
              color="green"
              onClick={() => setUserAnswer(true)}
              text="Yes"
              className="w-36"
              disabled={userHasAnswered && market.userAnswer === false}
            />
            <Button
              variant={userAnswer === false ? "primary" : "secondary"}
              color="red"
              onClick={() => setUserAnswer(false)}
              text="No"
              className="w-36"
              disabled={userHasAnswered && market.userAnswer === true}
            />
          </div>
        )}
        {marketIsOpen && userAnswer !== null && (
          <>
            <p className="pb-4 text-center text-base font-semibold">How many coins will you wager on your answer?</p>
            <CoinSlider value={coins} onChange={setCoins} disabled={userHasAnswered} />
          </>
        )}
        {!marketIsOpen && <p className="font-semibold">This market is not open for betting.</p>}
      </div>
      {userAnswer !== null && (
        <ConfirmationBox
          userAnswer={userAnswer}
          coins={coins}
          handlePlaceBet={handlerPlaceBet}
          allowBet={marketIsOpen && !userHasAnswered}
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
}: {
  userAnswer: boolean;
  coins: number;
  handlePlaceBet: () => void;
  allowBet: boolean;
}) => (
  <div className="flex flex-row place-items-center justify-between space-x-6 rounded-2xl border-2 border-sky-500 bg-sky-50 p-4 shadow-sm w-full mt-auto">
    <div className="flex flex-col">
      <p className="text-lg">
        Your answer: <strong>{userAnswer ? "Yes" : "No"}</strong>
      </p>
      <span className="flex flex-row space-x-1 pt-2 place-items-center">
        <div className="text-lg flex place-items-center gap-1">
          Cost: <img src="/images/coin.svg" alt="coin" className="w-5 h-5" />
          <strong>
            {coins} coin{coins > 1 ? "s" : ""}
          </strong>
        </div>
      </span>
    </div>
    {allowBet && <Button variant="secondary" color="blue" text="Confirm" className="w-36" onClick={handlePlaceBet} />}
  </div>
);

const MarketStats = ({ yesCount, noCount }: { yesCount: number; noCount: number }) => (
  <div className="flex w-full md:max-w-[50%] flex-col items-center justify-between rounded-2xl border border-neutral-300 bg-white p-6 shadow">
    <p className="font-semibold text-xl">See how others have voted</p>
    {yesCount + noCount > 0 ? (
      <GaugeComponent yesCount={yesCount} noCount={noCount} />
    ) : (
      <span className="text-neutral-500 text-lg">No data</span>
    )}
    <div className="flex w-full flex-row justify-between">
      <div className="flex gap-2 place-items-center">
        <div className="rounded-full bg-lime-600 w-4 h-4" />
        <div className="font-semibold">{yesCount} Yes</div>
      </div>
      <div className="flex gap-2 place-items-center">
        <div className="rounded-full bg-red-500 w-4 h-4" />
        <div className="font-semibold">{noCount} No</div>
      </div>
    </div>
  </div>
);

function QuestionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [marketData, setMarketData] = useState<MarketWithUserSpecificData | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get<APIResponse<MarketWithUserSpecificData>>(`/markets/${id}`).then((response) => {
      setMarketData(response.data.data);
    });
  }, [id]);

  if (!marketData || !id) {
    return <p>Market not found</p>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-5 bg-gray-100 p-16">
      <div className="max-w-7xl w-full flex flex-col gap-8">
        <BackButton onClick={() => navigate("/dashboard")} />
        <h1 className="text-3xl font-bold">Today's Topic: {marketData.name}</h1>
        <section className="flex flex-col md:flex-row gap-4 min-h-[30vh]">
          <Question market={marketData} marketId={id} />
          <MarketStats yesCount={marketData.totalYes} noCount={marketData.totalNo} />
        </section>
      </div>
    </div>
  );
}

export default QuestionPage;
