import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { APIResponse, api } from "@/api";
import { Button, Chip } from "@/components/primitives";
import { ChipColor } from "@/components/primitives/Chip";
import { Market } from "@/types";
import Header from "@/components/Header";
import climateqns from "../../storage/ClimateQuestionBank.json"
import entertainmentqns from "../../storage/EntertainmentQuestionBank.json"

enum MarketStatus {
    PENDING = "pending",
    ANSWERED = "answered",
    CORRECT = "correct",
    INCORRECT = "incorrect",
    CLOSED = "closed",
}


const AdminPage = () => {
    // const navigate = useNavigate();
    // const [markets, setMarkets] = useState<Market[]>([]);

    // useEffect(() => {
    //     api
    //     .get<APIResponse<Market[]>>("/markets")
    //     .then((response) => {
    //         setMarkets(Object.values(response.data.data));
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching markets:", error);
    //     });
    // }, []);

    // const getMarketStatus = (market: Market): MarketStatus => {
    //     const isOpen = new Date(market.openOn) < new Date() && new Date(market.closeOn) > new Date();
    //     if (!market.hasAnswered) {
    //     return isOpen ? MarketStatus.PENDING : MarketStatus.CLOSED;
    //     }
    //     if (market.resolution === null) {
    //     return MarketStatus.ANSWERED;
    //     }
    //     return market.isCorrect ? MarketStatus.CORRECT : MarketStatus.INCORRECT;
    // };

    // const getChipText = (status: MarketStatus): string => {
    //     switch (status) {
    //     case MarketStatus.PENDING:
    //         return "Pending";
    //     case MarketStatus.ANSWERED:
    //         return "Answered";
    //     case MarketStatus.CORRECT:
    //         return "Correct";
    //     case MarketStatus.INCORRECT:
    //         return "Incorrect";
    //     case MarketStatus.CLOSED:
    //         return "Closed";
    //     }
    // };

    // const getChipColor = (status: MarketStatus): ChipColor => {
    //     switch (status) {
    //     case MarketStatus.PENDING:
    //         return "blue";
    //     case MarketStatus.ANSWERED:
    //         return "yellow";
    //     case MarketStatus.CORRECT:
    //         return "green";
    //     case MarketStatus.INCORRECT:
    //         return "red";
    //     case MarketStatus.CLOSED:
    //         return "gray";
    //     }
    // };

    // const displayedMarkets = markets
    //     .filter((market) => {
    //     const now = new Date();
    //     return new Date(market.openOn) < now;
    //     })
    //     .sort((a, b) => new Date(a.openOn).getTime() - new Date(b.openOn).getTime());

    return (
        <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-5 bg-gray-100 p-16">
            <div className="max-w-7xl">
                <Header />
                <div className="w-full max-w-[1200px] mt-8">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-xl font-extrabold">Climate Markets</h2>
                        <section className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
                            {climateqns.map((market) => {
                                // const status = getMarketStatus(market);
                                // const chipText = getChipText(status);
                                // const chipColor = getChipColor(status);

                                return (
                                    <div
                                        key={market.id}
                                        className="grid grid-cols-[1fr_1fr_3fr_2fr] items-center px-4 py-2 border-b border-neutral-300 last:border-b-0"
                                    >
                                        <p className="text-base font-medium">
                                            DD/MM/YYYY
                                        </p>
                                        <p>
                                            Market {market.id}
                                        </p>
                                        <p className="text-base font-medium">{market.question}</p>
                                        <div className="flex justify-around">
                                            <Button
                                                text="Yes"
                                                color="green"
                                                onClick={() => alert("Coins have been distributed among participants!")}
                                                className="w-32"
                                            />
                                            <Button
                                                text="No"
                                                color="blue"
                                                onClick={() => alert("Coins have been distributed among participants!")}
                                                className="w-32"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </section>

                        <h2 className="text-xl font-extrabold pt-6">Entertainment Markets</h2>
                        <section className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
                            {entertainmentqns.map((market) => {
                                // const status = getMarketStatus(market);
                                // const chipText = getChipText(status);
                                // const chipColor = getChipColor(status);

                                return (
                                    <div
                                        key={market.id}
                                        className="grid grid-cols-[1fr_1fr_3fr_2fr] items-center px-4 py-2 border-b border-neutral-300 last:border-b-0"
                                    >
                                        <p className="text-base font-medium">
                                            DD/MM/YYYY
                                        </p>
                                        <p>
                                            Market {market.id}
                                        </p>
                                        <p className="text-base font-medium">{market.question}</p>
                                        <div className="flex justify-around">
                                            <Button
                                                text="Yes"
                                                color="green"
                                                onClick={() => alert("Coins have been distributed among participants!")}
                                                className="w-32"
                                            />
                                            <Button
                                                text="No"
                                                color="blue"
                                                onClick={() => alert("Coins have been distributed among participants!")}
                                                className="w-32"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;