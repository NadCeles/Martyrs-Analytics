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
            <h1>Milestones Stats</h1>
            <button onClick={onClickedZone}>Zone</button>
            <button onClick={onClickedBoss}>Boss</button>
            <button onClick={onClickedUnique}>Unique Items</button>
            <section id="milestones-analytics-public">
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
                                        position: 'left'
                                    },
                                    title: {
                                        display: false,
                                        text: 'Chart.js Bar Chart'
                                    }
                                }
                            }}
                            data={{
                                labels: zoneLabels,
                                datasets: [
                                    {
                                        label: 'Zones Milestones',
                                        data: zoneData,
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
                                        position: 'left'
                                    },
                                    title: {
                                        display: false,
                                        text: 'Chart.js Bar Chart'
                                    }
                                }
                            }}
                            data={{
                                labels: bossLabels,
                                datasets: [
                                    {
                                        label: 'Bosses Milestones',
                                        data: bossData,
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
                                        position: 'left'
                                    },
                                    title: {
                                        display: false,
                                        text: 'Chart.js Bar Chart'
                                    }
                                }
                            }}
                            data={{
                                labels: uniqueItemLabels,
                                datasets: [
                                    {
                                        label: 'Unique Milestones',
                                        data: uniqueItemData,
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    }
                                ]
                            }}
                        >
                        </Bar> : null
                }
            </section>
            {loggedIn ?
                <MilestonesAnalyticsPrivate></MilestonesAnalyticsPrivate> :
                <AnalyticsSignUpCallToAction></AnalyticsSignUpCallToAction>
            }
        </>
    )
}