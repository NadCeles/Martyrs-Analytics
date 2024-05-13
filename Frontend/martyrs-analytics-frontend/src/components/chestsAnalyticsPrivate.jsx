import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { getPrivateChestsOpened, getUserCharacters } from "../services/analytics";
import styles from "../pages/Analytics/analytics-page.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ChestsAnalyticsPrivate = () => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const getCharacters = async () => {
            const retrievedCharacters = await getUserCharacters();
            setCharacters(retrievedCharacters);
            await updateChartWithCharacterInfo(retrievedCharacters[0].id);
        }
        getCharacters();
    }, []);

    const updateChartWithCharacterInfo = async (characterId) => {
        const chestsOpened = await getPrivateChestsOpened(characterId);
        const retrievedLabels = [];
        const retrievedData = [];
        for (let i = 0; i < chestsOpened.length; i++) {
            retrievedLabels.push(chestsOpened[i].zone_name);
            retrievedData.push(chestsOpened[i].opened_chests_count);
        }
        setLabels(retrievedLabels)
        setData(retrievedData);
    }

    const clickCharacterButton = (id) => {
        updateChartWithCharacterInfo(id);
    }

    const makeCharacterButton = (data) => {
        return (
            <button className={styles.buttonSelector}
                key={"character-button-" + data.id}
                onClick={() => clickCharacterButton(data.id)}
            >
                {data.name}
            </button>
        )
    }

    return (
        <>
            <section className={styles.cardSelector} id="character-button-container">
                <h1>Characters</h1>
                { Array.isArray(characters) ? characters.map(makeCharacterButton, this) : <p>Error characters not accesible</p>}
            </section>
            <div className={styles.card}>
                <h1>Opened Chests by Character</h1>
                <section className={styles.chestPublic} id="chest-analytics-private-section">
                    <Bar
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,
                                    position: 'left'
                                },
                                title: {
                                    display: false,
                                    text: 'Opened Chests By Character'
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
                            labels: labels,
                            datasets: [
                                {
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
        </>
    )
}