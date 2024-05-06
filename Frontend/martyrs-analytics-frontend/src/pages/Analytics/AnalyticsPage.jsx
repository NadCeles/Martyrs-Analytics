import { useState } from "react";
import { MilestonesAnalytics } from "../../components/milestonesAnalytics";
import { EnemiesAnalytics } from "../../components/enemiesAnalytics";
import { ChestsAnalytics } from "../../components/chestsAnalytics";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export const Analytics = () => {
    const [milestonesClicked, setMilestonesClicked] = useState(true)
    const [enemiesClicked, setEnemiesClicked] = useState(false)
    const [chestsClicked, setChestsClicked] = useState(false)

    const onClickMilestones = () => {
        setMilestonesClicked(true);
        setEnemiesClicked(false);
        setChestsClicked(false);
    }

    const OnClickEnemies = () => {
        setMilestonesClicked(false);
        setEnemiesClicked(true);
        setChestsClicked(false);
    }

    const onClickChests = () => {
        setMilestonesClicked(false);
        setEnemiesClicked(false);
        setChestsClicked(true);
    }

    return (
        <>
            <Header></Header>
            <h1>Analytics Page</h1>
            <button onClick={onClickMilestones}>Milestones</button>
            <button onClick={OnClickEnemies}>Enemies</button>
            <button onClick={onClickChests}>Chests</button>
            { milestonesClicked ? <MilestonesAnalytics></MilestonesAnalytics> : null }
            { enemiesClicked ? <EnemiesAnalytics></EnemiesAnalytics> : null}
            { chestsClicked ? <ChestsAnalytics> </ChestsAnalytics> : null}
            <Footer></Footer>
        </>
    );
};