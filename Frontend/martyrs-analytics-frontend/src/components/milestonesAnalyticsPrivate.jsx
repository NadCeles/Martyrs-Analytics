import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState, useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { Bar } from 'react-chartjs-2';
import { getMilestonesReachedByUser, getUserCharacters } from "../services/analytics";
import styles from "../pages/Analytics/analytics-page.module.css";


export const MilestonesAnalyticsPrivate = () => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});
    const [characters, setCharacters] = useState([]);
    const [chartType, setChartType] = useState("Zones");
    const [selectedCharacterId, setSelectedCharacterId] = useState(0)

    useEffect(() => {
        const getCharacters = async () => {
            const retrievedCharacters = await getUserCharacters();
            setCharacters(retrievedCharacters);
            await updateChartWithCharacterInfo(retrievedCharacters[0].id);
            setSelectedCharacterId(retrievedCharacters[0].id)
        }
        getCharacters();
    }, []);

    const updateChartWithCharacterInfo = async (characterId) => {
        const milestonesReached = await getMilestonesReachedByUser(characterId, chartType)
        const retrievedLabels = [];
        const retrievedData = [];
        for (let i = 0; i < milestonesReached.length; i++) {
            retrievedLabels.push(milestonesReached[i].name);
            retrievedData.push(milestonesReached[i].reached ? 1 : 0);
        }
        setLabels(retrievedLabels)
        setData(retrievedData);
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

    const clickCharacterButton = (id) => {
        setSelectedCharacterId(id);
        updateChartWithCharacterInfo(id);
    }

    const onClickMilestonesButton = (type) => {
        setChartType(type);
        updateChartWithCharacterInfo(selectedCharacterId);
    }

    return (
        <>
            <section className={styles.cardSelector} id="character-button-container">
                <h1>Characters</h1>
                { Array.isArray(characters) ? characters.map(makeCharacterButton, this) : <p>Error characters not accesible</p>}
            </section>
            <div className={styles.cardSelector}>
                <h1>Milestone Selector</h1>
                <section className={styles.buttonContainer} id="milestone-selector">
                    <button className={styles.buttonSelector} id="zone-button" onClick={() => onClickMilestonesButton("Zone")}>Zone</button>
                    <button className={styles.buttonSelector} id="bosses-button" onClick={() => onClickMilestonesButton("Boss")}>Bosses</button>
                    <button className={styles.buttonSelector} id="unique-items-button" onClick={() => onClickMilestonesButton("Unique Item")}>Unique Items</button>
                </section>
            </div>
            <div className={styles.card}>
                <h1>Milestones Reached by Character</h1>
                <section className={styles.milestonePublic} id="milestones-reached-bar">
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
                                    text: 'Enemy Kills'
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
        </>
    )
}