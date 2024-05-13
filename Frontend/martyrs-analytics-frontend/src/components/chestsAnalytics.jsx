import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from "react"
import { Bar } from 'react-chartjs-2';
import { isLogged } from "../services/auth"
import { getPublicChestsOpened, getPublicCharacterCompletionPercentage } from "../services/analytics";
import { ChestsAnalyticsPrivate } from './chestsAnalyticsPrivate';
import { AnalyticsSignUpCallToAction } from '../components/analyticsSignUpCallToAction';
import styles from "../pages/Analytics/analytics-page.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ChestsAnalytics = () => {
    const [loggedIn, setLoggedIn] = useState(isLogged())
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});
    const [completionLabels, setCompletionLabels] = useState([]);
    const [completionData, setCompletionData] = useState({});

    useEffect(() => {
        const loadPublicChestData = async () => {
            const chestsOpenedInfo = await getPublicChestsOpened();
            const retrievedLabels = [];
            const retrievedData = [];

            chestsOpenedInfo.map((chest_opened_info) => {
                retrievedLabels.push(chest_opened_info.zone_name);
                retrievedData.push(chest_opened_info.opened_chests_count);
            });
            setLabels(retrievedLabels);
            setData(retrievedData);
        }

        const loadPublicCompletionData = async () => {
            const characterCompletionInfo = await getPublicCharacterCompletionPercentage();
            const retrievedLabels = [];
            const retrievedData = [];

            characterCompletionInfo.map((characterCompletionInfo) => {
                retrievedLabels.push(characterCompletionInfo.zone);
                retrievedData.push(characterCompletionInfo.percentage);
            });
            
            setCompletionLabels(retrievedLabels);
            setCompletionData(retrievedData);
        }

        loadPublicChestData();
        loadPublicCompletionData();
    }, [])

    return (
        <>
            <div className={styles.card}>    
                <h1>Total Chest Opened</h1>
                <section className={styles.chestPublic} id="chests-analytics-public-first">
                    <Bar
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                    position: 'top'
                                },
                                title: {
                                    display: false,
                                    text: 'Chests Opened Total',
                                    color: 'rgba(255, 255, 255, 1)',
                                    align: 'center',
                                    font:{
                                        size: 30
                                    },
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
                                        font:{
                                            size: 15,
                                        }
                                    }
                                }
                            },
                        }}
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Chests Opened Total',
                                    data: data,
                                    backgroundColor: 'rgba(241, 162, 8, 0.9)',
                                    barThickness:40,
                                }
                            ]
                        }}
                    >
                    </Bar>
                </section>
                </div>
                <div className={styles.card}>
                    <h1>Character Completion Percentage</h1>
                    <section className={styles.chestPublic} id="chests-analytics-public-second">
                        <Bar
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display:false,
                                        position: 'top'
                                    },
                                    title: {
                                        display: false,
                                        text: 'Character Completion Percentage'
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
                                            font:{
                                                size: 15,
                                            }
                                        }
                                    }
                                },
                            }}
                            data={{
                                labels: completionLabels,
                                datasets: [
                                    {
                                        label: 'Character Completion Percentage',
                                        data: completionData,
                                        backgroundColor: 'rgba(241, 162, 8, 0.9)',
                                        barThickness:40,
                                    }
                                ]
                            }}
                        >
                        </Bar>
                    </section>
            </div>
            {
                loggedIn ?
                    <ChestsAnalyticsPrivate></ChestsAnalyticsPrivate> :
                    <AnalyticsSignUpCallToAction></AnalyticsSignUpCallToAction>
            }
        </>
    )
}