import './AboutUsComponent.css'


const AboutUsComponent = () => {
    return (
        <>
            <div className="about-inner-container">
                <div className="about-about-box">
                    <div >
                        <h1 className="about-text">About</h1>
                    </div>
                    <p className="about-text">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`Turtle Express is web about transportation. 
                        Provenance of Turtle Express, Turtle is animal. It slow walk in fact, but it win rabbit from race in tale. 
                        It gives us a name of web that “Turtle Express”.`}
                    </p>
                </div>
                <div className="about-philosophy-box">
                    <p className="about-text">
                        <strong>"Take the best care of the deliveries to the recipient and send them quickly."</strong>
                    </p>
                </div>
                <div className="about-text">
                    <b>Contact</b>
                </div>
                <div className="about-text">
                    Turtle Express <br />
                    Tel.0225467999 <br />
                    Email: turtle_express@gmail.com
                </div>
            </div>
        </>
    )
}

export default AboutUsComponent;