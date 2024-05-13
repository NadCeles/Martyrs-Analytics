import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import styles from "./landing-page.module.css"
import image1 from "../../assets/images/media/image_1.jpg"
import image2 from "../../assets/images/media/image_2.jpg"
import image3 from "../../assets/images/media/image_3.jpg"
import image4 from "../../assets/images/media/image_4.jpg"
import image5 from "../../assets/images/media/image_5.jpg"
import image6 from "../../assets/images/media/image_6.jpg"

export const Landing = () => {

    return (
            <div className={styles.landingPage}>
                <Header></Header>
                <div className={styles.container}>
                    <article id="trailer-section" className={styles.card}>
                        <h1>SURVIVE THE DUNGEON</h1>
                        <iframe className={styles.video} src="https://www.youtube.com/embed/bGhW1PTSEpk?si=jaGQVpb2nMa8yJ0M" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullscreen>
                        </iframe>
                    </article>
                    <article id="game-section" className={styles.card}>
                        <h1>NOT A WEIRD TITLE</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </article>
                    <article id="media-section" className={styles.card}>
                        <h1>GALLERY</h1>
                        <div className={styles.imageContainer}>
                            <img src={image1} className={styles.image}></img>
                            <img src={image2} className={styles.image}></img>
                            <img src={image3} className={styles.image}></img>
                            <img src={image4} className={styles.image}></img>
                            <img src={image5} className={styles.image}></img>
                            <img src={image6} className={styles.image}></img>
                        </div>
                    </article>
                    <article id="newsletter-section" className={styles.card}>
                        <h1>JOIN THE NEWSLETTER</h1>
                        <form className={styles.newsletterContainer}>
                            <label>
                                Email
                                <input id="mail" name="email" type="text" className={styles.email}/>
                            </label>
                            <button type="submit" className={styles.newsletterButton}>Register</button>
                        </form>
                    </article>
                </div>
                <Footer></Footer>
            </div>
    );
};