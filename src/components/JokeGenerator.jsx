import React, { useState, useEffect } from 'react';

const JokeGenerator = () => {
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJoke = async () => { 
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setJoke(data.value);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke(); // Fetch a joke when the component mounts
    }, []);

    return (
        <div className="joke-generator">
            <h2>Random Joke Generator</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && <p>{joke}</p>}
            <button onClick={fetchJoke} style={{
                transition: 'background-color 0.3s ease',
            }}>
                Generate New Joke
            </button>
            <style jsx>{`
                .joke-generator {
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    text-align: center;
                }
                button:hover {
                    background-color: #007bff;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default JokeGenerator;