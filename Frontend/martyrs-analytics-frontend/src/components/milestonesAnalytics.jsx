import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { isLogged } from '../services/auth';
import { AnalyticsSignUpCallToAction } from "./analyticsSignUpCallToAction";
import { getMilestonePublicReachedPercentages } from '../services/analytics';
import { MilestonesAnalyticsPrivate } from './milestonesAnalyticsPrivate';
import style from "../pages/Analytics/analytics-page.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const MilestonesAnalytics = () => {

    const [loggedIn, setLoggedIn] = useState(isLogged())
    const [zoneLabels, setZoneLabels] = useState([]);
    const [bossLabels, setBossLabels] = useState([]);
    const [uniqueItemLabels, setUniqueItemLabels] = useState([]);
    const [zoneData, setZoneData] = useState({});
    const [bossData, setBossData] = useState({});
    const [uniqueItemData, setUniqueItemData] = useState({});

    const [zoneClicked, setZoneClicked] = useState(true)
    const [bossClicked, setBossClicked] = useState(false)
    const [uniqueItemClicked, setUniqueItemClicked] = useState(false)

    const onClickedZone = () => {
        setZoneClicked(true);
        setBossClicked(false);
        setUniqueItemClicked(false);
    }

    const onClickedBoss = () => {
        setZoneClicked(false);
        setBossClicked(true);
        setUniqueItemClicked(false);
    }

    const onClickedUnique = () => {
        setZoneClicked(false);
        setBossClicked(false);
        setUniqueItemClicked(true);
    }

    useEffect(() => {
        const loadPublicData = async () => {
            const milestonesReachedPercentages = await getMilestonePublicReachedPercentages();
            const retrievedZoneLabels = [];
            const retrievedZoneData = [];
            const retrievedBossesLabels = [];
            const retrievedBossesData = [];
            const retrievedUniqueItemsLabels = [];
            const retrievedUniqueItemsData = [];

            milestonesReachedPercentages.zones.map((milestoneInfo) => {
                retrievedZoneLabels.push(milestoneInfo.name);
                retrievedZoneData.push(milestoneInfo.character_completion_percentage);
            });

            setZoneLabels(retrievedZoneLabels);
            setZoneData(retrievedZoneData);

            milestonesReachedPercentages.bosses.map((milestoneInfo) => {
                retrievedBossesLabels.push(milestoneInfo.name);
                retrievedBossesData.push(milestoneInfo.character_completion_percentage);
            });

            setBossLabels(retrievedBossesLabels);
            setBossData(retrievedBossesData);

            milestonesReachedPercentages.unique_items.map((milestoneInfo) => {
                retrievedUniqueItemsLabels.push(milestoneInfo.name);
                retrievedUniqueItemsData.push(milestoneInfo.character_completion_percentage);
            });

            setUniqueItemLabels(retrievedUniqueItemsLabels);
            setUniqueItemData(retrievedUniqueItemsData);

        }
        loadPublicData();
    }, [])

    return (
        <>
             <div className={style.cardSelector}>
                    <h1>Milestone Categories</h1>
                    <div className={style.buttonContainer}>
                        <button className={style.buttonSelector} onClick={onClickedZone}>Zone</button>
                        <button className={style.buttonSelector} onClick={onClickedBoss}>Boss</button>
                        <button className={style.buttonSelector} onClick={onClickedUnique}>Unique Items</button>
                    </div>
            </div> 
            <div className={style.card}>    
                <h1>Milestones Stats</h1>
                <section className={style.milestonePublic} id="milestones-analytics-public">
                    {
                        zoneClicked ?
                            <Bar
                                options={{
                                    indexAxis: 'y',
                                    elements: {
                                        bar: {
                                            borderWidth: 1,
                                        },
                                    },
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display:false,
                                            position: 'left'
                                        },
                                        title: {
                                            display: false,
                                            text: 'Chart.js Bar Chart'
                                        }
                                    },
                                    scales:{
                                        y:{
                                            ticks:{
                                                color: 'rgba(255, 255, 255, 1)',
                                                font:{
                                                    size: 20,
                                                }
                                            },
                                        },
                                        x:{
                                            ticks:{
                                                color:'rgba(255, 255, 255, 1)',
                                            }
                                        }
                                    }
                                }}
                                data={{
                                    labels: zoneLabels,
                                    datasets: [
                                        {
                                            label: 'Zones Milestones',
                                            data: zoneData,
                                            backgroundColor: 'rgba(241, 162, 8, 0.9)',
                                            barThickness:40,
                                        }
                                    ]
                                }}
                            >
                            </Bar> : null
                    }
                    {
                        bossClicked ?
                            <Bar
                                options={{
                                    indexAxis: 'y',
                                    elements: {
                                        bar: {
                                            borderWidth: 1,
                                        },
                                    },
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display:false,
                                            position: 'left'
                                        },
                                        title: {
                                            display: false,
                                            text: 'Chart.js Bar Chart'
                                        }
                                    },
                                    scales:{
                                        y:{
                                            ticks:{
                                                color: 'rgba(255, 255, 255, 1)',
                                                font:{
                                                    size: 20,
                                                }
                                            },
                                        },
                                        x:{
                                            ticks:{
                                                color:'rgba(255, 255, 255, 1)',
                                            }
                                        }
                                    }
                                }}
                                data={{
                                    labels: bossLabels,
                                    datasets: [
                                        {
                                            label: 'Bosses Milestones',
                                            data: bossData,
                                            backgroundColor: 'rgba(241, 162, 8, 0.9)',
                                            barThickness:40,
                                        }
                                    ]
                                }}
                            >
                            </Bar> : null
                    }
                    {
                        uniqueItemClicked ?
                            <Bar
                                options={{
                                    indexAxis: 'y',
                                    elements: {
                                        bar: {
                                            borderWidth: 1,
                                        },
                                    },
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                            position: 'left'
                                        },
                                        title: {
                                            display: false,
                                            text: 'Chart.js Bar Chart'
                                        }
                                    },
                                    scales:{
                                        y:{
                                            ticks:{
                                                color: 'rgba(255, 255, 255, 1)',
                                                font:{
                                                    size: 20,
                                                }
                                            },
                                        },
                                        x:{
                                            ticks:{
                                                color:'rgba(255, 255, 255, 1)',
                                            }
                                        }
                                    }
                                }}
                                data={{
                                    labels: uniqueItemLabels,
                                    datasets: [
                                        {
                                            label: 'Unique Milestones',
                                            data: uniqueItemData,
                                            backgroundColor: 'rgba(241, 162, 8, 0.9)',
                                            barThickness:40,
                                        }
                                    ]
                                }}
                            >
                            </Bar> : null
                    }
                </section>
            </div>   
            {loggedIn ?
                <MilestonesAnalyticsPrivate></MilestonesAnalyticsPrivate> :
                <AnalyticsSignUpCallToAction></AnalyticsSignUpCallToAction>
            }
        </>
    )
}