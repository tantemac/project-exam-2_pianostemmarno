import Head from "../components/layout/Head";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { SERVICE_URL } from "../constants/api";
import Image from "next/image";
import { useAuth } from "../components/utils/storage";

const isValidImage = (url) => {
    return url.startsWith("/") || url.startsWith("http");
}

export default function Services({services}) {
    const authToken = useAuth();

    return (
    <Layout>
        <Head title="Tenester"/>
        <h1 className="text-4xl text-center pt-10 pb-6">Tenester</h1>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"> 

            {services.map((service) => {

                return <div className="flex flex-col justify-center rounded-lg overflow-hidden shadow-lg p-3" key={service.id}>
                            <div className="self-center">
                            {isValidImage(service.image)&&(
                                <Image src={service.image} width={100} height={100} alt={service.title} />
                            )}
                            </div>
                            <div className="px-6 py-4">
                                <h3 className="py-2 h-20 font-heading text-lg">{service.title}</h3>
                                <p className="py-2">Pris: {service.price},-</p>
                                <p className="lg:h-80">{service.description}</p>
                                {authToken&&(
                                        <Link href={`/edit/service/${service.id}`}>
                                            <button className="bg-black bg-opacity-75 p-2 rounded my-4 text-white w-full focus:ring-4 focus:ring-black focus:ring-opacity-75 hover:bg-opacity-50">
                                                <a>Rediger</a>
                                            </button>
                                        </Link>        
                                   
                                )}
                            </div>
                        </div>;
            })}
        </div>
        {authToken&&(
                <Link href="/add">
                    <div className="flex justify-center mt-10">
                        <button className="bg-black bg-opacity-75 hover:bg-opacity-50 text-white text-lg rounded-lg p-4">
                            <p className="text-8xl">+</p>
                            <p>Legg til ny teneste</p>
                        </button>
                    </div>
                </Link>
            )}
    </Layout>
);
}  

export async function getStaticProps() {
    let services = [];

    try {
        const response = await axios.get(SERVICE_URL);
        console.log(response.data)

        services = response.data;
    } catch (error) {
        console.log(error);
        setError(true);
    }
    
return {
        props: {
            services: services,
        }, 
    };
}  