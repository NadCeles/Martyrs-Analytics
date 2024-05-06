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
            <h1>Enemies Stats</h1>
            <section id="enemies-analytics-public">
                <Bar
                    options={{
                        indexAxis: 'y',
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'left'
                            },
                            title: {
                                display: true,
                                text: 'Enemy Kills'
                            }
                        }
                    }}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Enemy Kills',
                                data: data,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }
                        ]
                    }}
                >
                </Bar>
            </section>
            {
                loggedIn ?
                    <EnemiesAnalyticsPrivate></EnemiesAnalyticsPrivate> :
                    <AnalyticsSignUpCallToAction></AnalyticsSignUpCallToAction>
            }
        </>
    )
}