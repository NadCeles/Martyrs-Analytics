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
            <h1>Chests Opened</h1>
            <section id="chests-analytics-public-first">
                <Bar
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            },
                            title: {
                                display: false,
                                text: 'Chests Opened Total'
                            }
                        }
                    }}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Chests Opened Total',
                                data: data,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }
                        ]
                    }}
                >
                </Bar>
            </section>
            <section id="chests-analytics-public-second">
                <Bar
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            },
                            title: {
                                display: false,
                                text: 'Character Completion Percentage'
                            }
                        }
                    }}
                    data={{
                        labels: completionLabels,
                        datasets: [
                            {
                                label: 'Character Completion Percentage',
                                data: completionData,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }
                        ]
                    }}
                >
                </Bar>
            </section>
        </>
    )
}