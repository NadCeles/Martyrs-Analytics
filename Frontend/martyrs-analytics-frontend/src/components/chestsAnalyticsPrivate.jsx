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
                { Array.isArray(characters) ? characters.map(makeCharacterButton, this) : <p>Error characters not accesible</p>}
            </section>
            <section id="chest-analytics-private-section">
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
                                text: 'Opened Chests By Character'
                            }
                        }
                    }}
                    data={{
                        labels: labels,
                        datasets: [
                            {
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