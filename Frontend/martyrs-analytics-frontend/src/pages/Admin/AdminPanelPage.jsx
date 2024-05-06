import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { AdminMilestonesAnalytics } from "../../components/adminMilestonesAnalytics";
import { AdminChestsAnalytics } from "../../components/adminChestsAnalytics";
import { AdminEnemiesAnalytics } from "../../components/adminEnemiesAnalytics";
import { useState } from "react";

export const AdminPanel = () => {
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
            <h1>Admin Page</h1>
            <button onClick={onClickMilestones}>Milestones</button>
            <button onClick={OnClickEnemies}>Enemies</button>
            <button onClick={onClickChests}>Chests</button>
            { milestonesClicked ? <AdminMilestonesAnalytics></AdminMilestonesAnalytics> : null }
            { enemiesClicked ? <AdminEnemiesAnalytics></AdminEnemiesAnalytics> : null}
            { chestsClicked ? <AdminChestsAnalytics></AdminChestsAnalytics> : null}
            <Footer></Footer>
        </>
    );
};