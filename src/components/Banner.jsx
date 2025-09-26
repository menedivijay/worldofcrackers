import { useState, useEffect } from "react";

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize(); // initial check
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
    return (
        <section
            className="text-light text-center"
            style={{width: "100%" ,
                height: isMobile ? "190px" : "380px",
                backgroundImage: isMobile ? "url('./images/mobilebanner.jpg')":"url('./images/discounbanner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",}}
        > {isMobile ? " ": <div className="container py-md-6 px-4" 
            style={{
                paddingTop: isMobile ? "40px" : "85px" }} >
            <div className="mx-auto" style={{ maxWidth: isMobile ? "90%" : "56rem", paddingRight: isMobile ? "0px" : "100px",}}>
                <h5 className="fw-bold mb-3 mt-1 display-6" style={{fontSize: isMobile ? "1.5rem" : "2.5rem", paddingRight: isMobile ? "0px" : "110px",}}>
                CELEBRATE WITH US
                </h5>
                <p
                className="fs-5 mb-3 mx-auto"
                style={{ maxWidth: isMobile ? "90%" : "40rem",
                    opacity: 0.9,
                    fontFamily: "initial",
                    paddingRight: isMobile ? "0px" : "100px",
                    fontSize: isMobile ? "1rem" : "1.25rem", }}
                >
                "Light up your life with joy <br></br>and happiness this Diwali. <br></br>Let the celebrations begin!"
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center" style={{paddingRight: isMobile ? "0px" : "120px"}}>
                <button className="btn btn-light btn-lg text-dark">Shop Now</button>
                <button
                    className="btn btn-outline-light btn-lg"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                    View Deals
                </button>
                </div>
            </div>
            </div>}
            
        </section>
        );

}

export default Banner;