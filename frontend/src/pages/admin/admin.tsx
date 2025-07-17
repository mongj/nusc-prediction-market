import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { APIResponse, api } from "@/api";
import { Button, Chip } from "@/components/primitives";
import { ChipColor } from "@/components/primitives/Chip";
import { Market } from "@/types";
import Header from "@/components/Header";


enum MarketStatus {
    PENDING = "pending",
    RESOLVED = "resolved",
}

const AdminPage = () => {
    const [markets, setMarkets] = useState<Market[]>([]);

    useEffect(() => {
        api
            .get<APIResponse<Market[]>>("/markets/admin")
            .then((response) => {
                setMarkets(Object.values(response.data.data));
            })
            .catch((error) => {
                console.error("Error fetching markets:", error);
            });
    }, []);

    const getMarketStatus = (market: Market): MarketStatus => {
        if (market.resolution != true) {
            return MarketStatus.PENDING;
        }
        return MarketStatus.RESOLVED;
    };

    const getChipText = (status: MarketStatus): string => {
        switch (status) {
            case MarketStatus.PENDING:
                return "Pending";
            case MarketStatus.RESOLVED:
                return "Resolved";
        }
    };

    const getChipColor = (status: MarketStatus): ChipColor => {
        switch (status) {
            case MarketStatus.PENDING:
                return "blue";
            case MarketStatus.RESOLVED:
                return "yellow";
        }
    };

    const climateMarkets = markets.filter(market => !market.isControl)
    const entertainmentMarkets = markets.filter(market => market.isControl)

    const handleResolve = async (marketId: number, resolution: boolean) => {
        try {
          await api.post(`/markets/${marketId}/resolve`, { resolution });
          // Refresh the markets list
          const response = await api.get<APIResponse<Market[]>>("/markets/admin");
          setMarkets(Object.values(response.data.data));
          alert(`Market resolved as ${resolution}. Coins have been distributed among participants!`);
        } catch (error) {
          console.error("Error resolving market:", error);
          alert("Failed to resolve market");
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-3 sm:gap-5 bg-gray-100 p-4 sm:p-16">
            <div className="w-full max-w-7xl">
                <Header />
                <div className="w-full max-w-[1200px] mt-4 sm:mt-8">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-lg sm:text-xl font-extrabold">Climate Markets</h2>
                        <section className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
                            {climateMarkets.map((market) => {
                                const status = getMarketStatus(market);
                                const chipText = getChipText(status);
                                const chipColor = getChipColor(status);

                                return (
                                    <div
                                        key={market.id}
                                        className="grid grid-cols-[1fr_4fr_1fr_1fr] items-center px-4 py-2 border-b border-neutral-300 last:border-b-0"
                                    >
                                        <p className="text-base font-medium">
                                            {new Date(market.openOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                        </p>
                                        <p className="text-base font-medium">{market.question}</p>
                                        <div className="flex justify-center">
                                            <Chip text={chipText} color={chipColor} />
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="flex flex-col sm:flex-row justify-between sm:justify-around gap-2 mt-2 sm:mt-0">
                                                <Button
                                                    text="Yes"
                                                    color="green"
                                                    onClick={() => handleResolve(market.id, true)}
                                                    className="w-full sm:w-32"
                                                />
                                                <Button
                                                    text="No"
                                                    color="blue"
                                                    onClick={() => handleResolve(market.id, false)}
                                                    className="w-full sm:w-32"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>

                        <h2 className="text-lg sm:text-xl font-extrabold pt-4 sm:pt-6">Entertainment Markets</h2>
                        <section className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
                            {entertainmentMarkets.map((market) => {
                                const status = getMarketStatus(market);
                                const chipText = getChipText(status);
                                const chipColor = getChipColor(status);

                                return (
                                    <div
                                        key={market.id}
                                        className="grid grid-cols-[1fr_4fr_1fr_1fr] items-center px-4 py-2 border-b border-neutral-300 last:border-b-0"
                                    >
                                        <p className="text-base font-medium">
                                            {new Date(market.openOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                        </p>
                                        <p className="text-base font-medium">{market.question}</p>
                                        <div className="flex justify-center">
                                            <Chip text={chipText} color={chipColor} />
                                        </div>
                                        <div className="flex justify-end">
                                            <div className="flex flex-col sm:flex-row justify-between sm:justify-around gap-2 mt-2 sm:mt-0">
                                                <Button
                                                    text="Yes"
                                                    color="green"
                                                    onClick={() => handleResolve(market.id, true)}
                                                    className="w-full sm:w-32"
                                                />
                                                <Button
                                                    text="No"
                                                    color="blue"
                                                    onClick={() => handleResolve(market.id, false)}
                                                    className="w-full sm:w-32"
                                                />
                                            </div>
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