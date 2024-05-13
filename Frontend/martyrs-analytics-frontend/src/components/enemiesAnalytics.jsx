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
import { getPublicEnemyKills } from '../services/analytics';
import { AnalyticsSignUpCallToAction } from "./analyticsSignUpCallToAction";
import { EnemiesAnalyticsPrivate } from './enemiesAnalyticsPrivate';
import styles from "../pages/Analytics/analytics-page.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const EnemiesAnalytics = () => {
    const [loggedIn, setLoggedIn] = useState(isLogged());
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        const loadPublicData = async () => {
            const enemyKillsInfo = await getPublicEnemyKills();
            const retrievedLabels = [];
            const retrievedData = [];

            enemyKillsInfo.map((enemy_kill_info) => {
                retrievedLabels.push(enemy_kill_info.enemy_name);
                retrievedData.push(enemy_kill_info.enemy_kills);
            });
            setLabels(retrievedLabels);
            setData(retrievedData);
        }
        loadPublicData();
    }, [])

    return (
        <>
            <div className={styles.card}>
                <h1>Enemy Kills</h1>
                <section className={styles.enemiesPublic} id="enemies-analytics-public">
                    <Bar
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                    position: 'left',
                                },
                                title: {
                                    display: false,
                                    text: 'Enemy Kills',
                                    color: 'rgba(255, 255, 255, 1)',
                                    align: 'center',
                                    font:{
                                        size: 30
                                    },
                                },
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
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Enemy Kills',
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
            
            {
                loggedIn ?
                    <EnemiesAnalyticsPrivate></EnemiesAnalyticsPrivate> :
                    <AnalyticsSignUpCallToAction></AnalyticsSignUpCallToAction>
            }
        </>
    )
}