const Banner = () => {
    return (
        <section
            className="text-light text-center"
            style={{width: "100%", height: "380px",backgroundImage: "url('./images/banner.jpg')", backgroundSize: "cover", backgroundPosition: "center",}}
        >
            <div className="container py-md-6 px-4" style={{paddingTop:"85px"}} >
            <div className="mx-auto" style={{ maxWidth: "56rem" ,paddingRight:"100px"}}>
                <h5 className="fw-bold mb-3 mt-1 display-6" style={{paddingRight:"110px"}}>
                CELEBRATE WITH US
                </h5>
                <p
                className="fs-5 mb-3 mx-auto"
                style={{ maxWidth: "40rem", opacity: 0.9,fontFamily:"initial",paddingRight:"100px" }}
                >
                "Light up your life with joy <br></br>and happiness this Diwali. <br></br>Let the celebrations begin!"
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center" style={{paddingRight:"120px"}}>
                <button className="btn btn-light btn-lg text-dark">Shop Now</button>
                <button
                    className="btn btn-outline-light btn-lg"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                    View Deals
                </button>
                </div>
            </div>
            </div>
        </section>
        );

}

export default Banner;