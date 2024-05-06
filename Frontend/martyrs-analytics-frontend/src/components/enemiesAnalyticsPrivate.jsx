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
import { getEnemyKillsByCharacter, getUserCharacters } from "../services/analytics";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const EnemiesAnalyticsPrivate = () => {
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
        const enemyKills = await getEnemyKillsByCharacter(characterId);
        const retrievedLabels = [];
        const retrievedData = [];
        for(let i = 0; i < enemyKills.length; i++) {
            retrievedLabels.push(enemyKills[i].enemy_name);
            retrievedData.push(enemyKills[i].enemy_kills);
        }
        setLabels(retrievedLabels)
        setData(retrievedData);
    }

    const clickCharacterButton = (id) => {
        updateChartWithCharacterInfo(id);
    }

    const makeCharacterButton = (data) => {
        return (
            <button
                key={"character-button-" + data.id}
                onClick={() => clickCharacterButton(data.id)}
            >
                {data.name}
            </button>
        )
    }

    return (
        <>
            <section id="character-button-container">
                {characters.map(makeCharacterButton, this)}
            </section>
            <section id="enemies-defeated-analytics-section">
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
                                minBarLength: 10
                            }
                        ]
                    }}
                >
                </Bar>
            </section>
        </>
    )
}