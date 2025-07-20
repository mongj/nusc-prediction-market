import { useEffect, useState } from "react";

import { APIResponse, api } from "@/api";
import { Button, Chip } from "@/components/primitives";
import { ChipColor } from "@/components/primitives/Chip";
import { Market } from "@/types";
import AdminHeader from "@/components/Header/adminHeader";

enum MarketStatus {
    PENDING = "pending",
    RESOLVED = "resolved",
}

const AdminPage = () => {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [climatePage, setClimatePage] = useState(1);
    const [entPage, setEntPage] = useState(1);
    const itemsPerPage = 10;

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
        .sort((a, b) => new Date(a.openOn).getTime() - new Date(b.openOn).getTime());
    const entertainmentMarkets = markets.filter(market => market.isControl)
        .sort((a, b) => new Date(a.openOn).getTime() - new Date(b.openOn).getTime());

    // Pagination logic for climate
    const climateTotalPages = Math.ceil(climateMarkets.length / itemsPerPage);
    const climateIndexOfLast = climatePage * itemsPerPage;
    const climateIndexOfFirst = climateIndexOfLast - itemsPerPage;
    const currentClimateMarkets = climateMarkets.slice(climateIndexOfFirst, climateIndexOfLast);

    // Pagination logic for entertainment
    const entTotalPages = Math.ceil(entertainmentMarkets.length / itemsPerPage);
    const entIndexOfLast = entPage * itemsPerPage;
    const entIndexOfFirst = entIndexOfLast - itemsPerPage;
    const currentEntMarkets = entertainmentMarkets.slice(entIndexOfFirst, entIndexOfLast);

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

    const renderMarketTable = (
        markets: Market[],
        page: number,
        setPage: (n: number) => void,
        totalPages: number,
        totalMarkets: number
    ) => (
        <div className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
            <section>
                {markets.map((market) => {
                    const status = getMarketStatus(market);
                    const chipText = getChipText(status);
                    const chipColor = getChipColor(status);
                    const isResolved = market.resolution === true;

                    return (
                        <div
                            key={market.id}
                            className="grid grid-cols-1 sm:grid-cols-[1fr_4fr_1fr_1fr] items-start sm:items-center px-2 sm:px-4 py-2 border-b border-neutral-300 last:border-b-0 gap-y-2"
                        >
                            <p className="text-xs sm:text-base font-medium text-gray-700 sm:text-black">
                                {new Date(market.openOn).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </p>
                            <p className="text-xs sm:text-base font-medium text-gray-700 sm:text-black break-words">
                                {market.question}
                            </p>
                            <div className="flex justify-center mt-1 sm:mt-0">
                                <Chip text={chipText} color={chipColor} />
                            </div>
                            <div className="flex justify-end">
                                <div className="flex flex-row sm:flex-row justify-end gap-2 mt-1 sm:mt-0 w-full">
                                    <Button
                                        text="Yes"
                                        color="green"
                                        onClick={() => handleResolve(market.id, true)}
                                        className="w-1/2 sm:w-32 text-xs sm:text-base"
                                        disabled={isResolved}
                                    />
                                    <Button
                                        text="No"
                                        color="blue"
                                        onClick={() => handleResolve(market.id, false)}
                                        className="w-1/2 sm:w-32 text-xs sm:text-base"
                                        disabled={isResolved}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-2 sm:px-6 py-2 sm:py-3 gap-2 sm:gap-0">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-700">
                            Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                            <span className="font-medium">{Math.min(page * itemsPerPage, totalMarkets)}</span> of{" "}
                            <span className="font-medium">{totalMarkets}</span> results
                        </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            text="Previous"
                            size="small"
                        />
                        <Button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            text="Next"
                            size="small"
                        />
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-3 sm:gap-5 bg-gray-100 p-4 sm:p-16">
            <div className="w-full max-w-7xl">
                <AdminHeader />
                <div className="w-full max-w-[1200px] mt-4 sm:mt-8">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-lg sm:text-xl font-extrabold">Climate Markets</h2>
                        {renderMarketTable(currentClimateMarkets, climatePage, setClimatePage, climateTotalPages, climateMarkets.length)}

                        <h2 className="text-lg sm:text-xl font-extrabold pt-4 sm:pt-6">Entertainment Markets</h2>
                        {renderMarketTable(currentEntMarkets, entPage, setEntPage, entTotalPages, entertainmentMarkets.length)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;