import { Link } from 'react-router-dom'
import HeroSpace from '../components/HeroSpace'
import '../styles/ContactsPage.css'

export default function ContactsPage() {
    return <>

        <div className="container my-5">

            <h1 className='fw-bold'>Dove trovarci</h1>

            <div className="row">

                <div className='col-12 col-md-6 p-3'>
                    <div className='contact-card i-and-p-hover contacts-hover h-100 d-flex justify-content-between align-items-center'>

                        <div className='gap-4 d-block d-lg-flex justify-content-center align-items-center'>
                            <h2>Email</h2>
                            <p>info@fluffman.com</p>
                        </div>

                        <div>
                            <i className="fa-solid fa-envelope"></i>
                        </div>

                    </div>
                </div>

                <div className='col-12 col-md-6 p-3'>
                    <div className='contact-card i-and-p-hover contacts-hover h-100 d-flex justify-content-between align-items-center'>

                        <div className='gap-4 d-block d-lg-flex justify-content-center align-items-center'>
                            <h2>Telefono</h2>
                            <p>+333 000-777-99</p>
                        </div>

                        <div>
                            <i className="fa-solid fa-phone"></i>
                        </div>

                    </div>
                </div>

                <div className='col-12 col-md-6 p-3'>
                    <div className='contact-card i-and-p-hover contacts-hover h-100 d-flex justify-content-between align-items-center'>

                        <div className='gap-4 d-block d-lg-flex justify-content-center align-items-center'>
                            <h2>Indirizzo</h2>
                            <p>via Boolean 5 (Fl)</p>
                        </div>

                        <div>
                            <i className="fa-solid fa-location-dot"></i>
                        </div>

                    </div>
                </div>

                <div className='col-12 col-md-6 p-3'>
                    <div className='contacts-hover contact-card h-100 d-flex justify-content-between align-items-center gap-2'>

                        <h2>Socials</h2>

                        <div className='socials row'>

                            <div className='col-3 p-0 i-and-p-hover social-margin-on-hover'><Link><button><i className="fa-brands fa-instagram"></i></button></Link></div>
                            <div className='col-3 p-0 i-and-p-hover social-margin-on-hover'><Link><button><i className="fa-brands fa-tiktok"></i></button></Link></div>
                            <div className='col-3 p-0 i-and-p-hover social-margin-on-hover'><Link><button><i className="fa-brands fa-facebook"></i></button></Link></div>
                            <div className='col-3 p-0 i-and-p-hover social-margin-on-hover'><Link><button><i className="fa-brands fa-linkedin"></i></button></Link></div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <HeroSpace />

    </>
}