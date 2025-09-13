import { db } from "@/services";

export class MilestoneService {
  /**
   * Check and award milestone bonuses for a user
   * Returns the number of new milestones completed
   */
  public static async checkAndAwardMilestones(userId: number): Promise<number> {
    const participant = await db.participant.findUnique({
      where: { user_id: userId },
      include: {
        bets: {
          include: {
            market: true,
          },
        },
      },
    });

    if (!participant || participant.in_control_group === null) {
      throw new Error("Participant not found or not assigned to a group");
    }

    // Determine base market ID based on control group
    // const baseMarketId = participant.in_control_group ? 1 : 31; //uncomment for actual study
    const baseMarketId = 1;

    // Get current milestone rewards (e.g., "11000" means milestones 1&2 rewarded)
    const currentRewards = participant.milestone_rewards;
    let newRewards = currentRewards;
    let newMilestonesCompleted = 0;
    let cashToAdd = 0;

    // Check each of the 5 milestones
    for (let milestoneIndex = 0; milestoneIndex < 5; milestoneIndex++) {
      const milestoneNumber = milestoneIndex + 1;
      
      // Skip if milestone already rewarded
      if (currentRewards[milestoneIndex] === '1') {
        continue;
      }

      // Check if this milestone is completed (4+ bets out of 6 markets)
      const milestoneMarketIds = Array.from({ length: 6 }, (_, marketIndex) => 
        baseMarketId + (milestoneIndex * 6) + marketIndex
      );

      const betsInMilestone = participant.bets.filter(bet => 
        milestoneMarketIds.includes(bet.market_id)
      );

      // Milestone completed if user has 4+ bets in this milestone
      if (betsInMilestone.length >= 4) {
        // Mark this milestone as rewarded
        newRewards = newRewards.substring(0, milestoneIndex) + '1' + newRewards.substring(milestoneIndex + 1);
        newMilestonesCompleted++;
        cashToAdd++;
      }
    }

    // Update participant if there are new milestone completions
    if (newMilestonesCompleted > 0) {
      await db.participant.update({
        where: { user_id: userId },
        data: {
          milestone_rewards: newRewards,
          cash_balance: {
            increment: cashToAdd,
          },
        },
      });
    }

    return newMilestonesCompleted;
  }

  /**
   * Get milestone status for a user
   */
  public static async getMilestoneStatus(userId: number) {
    const participant = await db.participant.findUnique({
      where: { user_id: userId },
      include: {
        bets: {
          include: {
            market: true,
          },
        },
      },
    });

    if (!participant || participant.in_control_group === null) {
      throw new Error("Participant not found or not assigned to a group");
    }

    const baseMarketId = participant.in_control_group ? 1 : 31;
    const milestoneRewards = participant.milestone_rewards;

    const milestones = Array.from({ length: 5 }, (_, milestoneIndex) => {
      const milestoneNumber = milestoneIndex + 1;
      const milestoneMarketIds = Array.from({ length: 6 }, (_, marketIndex) => 
        baseMarketId + (milestoneIndex * 6) + marketIndex
      );

      const betsInMilestone = participant.bets.filter(bet => 
        milestoneMarketIds.includes(bet.market_id)
      );

      const isCompleted = betsInMilestone.length >= 4;
      const isRewarded = milestoneRewards[milestoneIndex] === '1';

      return {
        milestoneNumber,
        marketIds: milestoneMarketIds,
        betsCount: betsInMilestone.length,
        isCompleted,
        isRewarded,
        needsReward: isCompleted && !isRewarded,
      };
    });

    return {
      participant: {
        user_id: participant.user_id,
        cash_balance: participant.cash_balance,
        milestone_rewards: participant.milestone_rewards,
        in_control_group: participant.in_control_group,
      },
      milestones,
    };
  }
}