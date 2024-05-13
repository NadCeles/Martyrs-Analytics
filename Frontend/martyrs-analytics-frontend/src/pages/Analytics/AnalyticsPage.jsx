import { useState } from "react";
import { MilestonesAnalytics } from "../../components/milestonesAnalytics";
import { EnemiesAnalytics } from "../../components/enemiesAnalytics";
import { ChestsAnalytics } from "../../components/chestsAnalytics";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import style from "./analytics-page.module.css";

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
            <div className={style.analyticsPage}>
                <Header></Header>
                <div className={style.container}>
                    
                    <div className={style.cardSelector}>
                        <h1>Stats Categories</h1>
                        <div className={style.buttonContainer}>
                            <button className={style.buttonSelector} onClick={onClickMilestones}>Milestones</button>
                            <button className={style.buttonSelector} onClick={OnClickEnemies}>Enemies</button>
                            <button className={style.buttonSelector} onClick={onClickChests}>Chests</button>
                        </div>
                    </div>
                    
                    { milestonesClicked ? <MilestonesAnalytics></MilestonesAnalytics> : null }
                    { enemiesClicked ? <EnemiesAnalytics></EnemiesAnalytics> : null}
                    { chestsClicked ? <ChestsAnalytics> </ChestsAnalytics> : null}
                </div>
                
                <Footer></Footer>
            </div>
        </>
    );
};