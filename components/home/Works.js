

export default function Works({ works }) {
    return (
        <div>
            <h1>Portfolio</h1>
            {works.map((work) => (
                <div key={work._id}>
                    <h2>{work.title}</h2>
                    <p>{work.description}</p>
                    <img src={work.image} alt=""/>
                </div>
            ))}
        </div>
    );
}

