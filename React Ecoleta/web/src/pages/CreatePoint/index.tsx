import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'
import axios from 'axios'
import './styles.css'

import DropZone from '../../components/Dropzone/index'



interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}


const CreatePoint = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const [items, setItems] = useState<Item[]>([])
    //informação de seleção contendo as cidades e estados
    const [ufs, setUfs] = useState<string[]>([])
    const [citys, setCitys] = useState<string[]>([])
    //variavel com informação cidade e estado
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    // map parte geografica
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    //items selecionar
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    //arquivo 
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory()

    //Buscar os items
    useEffect(() => {
        api.get('items').then(resp => {
            setItems(resp.data);
        })
    }, [])

    //Selecionar o UF   
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(resp => {
            const ufInitials = resp.data.map(uf => uf.sigla)
            setUfs(ufInitials)
        })
    }, [])

    //Selecionar O municipio com base no UF
    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(resp => {
            const cityNames = resp.data.map(city => city.nome)
            setCitys(cityNames)
        })

    }, [selectedUf])

    //Pegar a localização atual
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition([latitude, longitude])
        })



    }, [])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value
        setSelectedUf(uf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setSelectedCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    function handleSelectItems(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id)

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([...selectedItems, id])
        }


    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems

        //enviar em formato Json, devido ao arquivo tem que enviar formatoData 
        // const data = { name, email, whatsapp, uf, city, latitude, longitude, items }

        //Formato para enviar arquivos
        const data = new FormData()
        data.append('name', name);
        data.append('email', email)
        data.append('whatsapp', whatsapp)
        data.append('uf', uf)
        data.append('city', city)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('items', items.join(','))
        if (selectedFile) {
            data.append('image', selectedFile)
        }


        await api.post('points', data)
        alert('Ponto e Coleta criado!')
        history.push('/')
    }

    return (
        <div id='page-create-point'>
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to='/'>
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> ponto coleta</h1>
                <fieldset>

                    <DropZone onFileUploaded={setSelectedFile} />

                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input type="text"
                            name="name"
                            id="name" onChange={handleInputChange} />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" onChange={handleInputChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whtasapp</label>
                            <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>
                    <Map center={[-23.5459781, -46.4824619]} zoom={20} onclick={handleMapClick} >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf"
                                value={selectedUf} onChange={handleSelectUf}   >
                                <option value="0">Selecione uma UF</option>
                                {
                                    ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city"
                                value={selectedCity} onChange={handleSelectCity}  >
                                <option value="0">Selecione uma cidade</option>
                                {
                                    citys.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}
                                onClick={() => handleSelectItems(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}   >
                                <img src={item.image_url} alt="Teste" />
                                <span>{item.title}</span>
                            </li>
                        ))}

                    </ul>
                    <button type="submit">
                        Cadastrar ponto de Coleta
                    </button>

                </fieldset>
            </form>

        </div>
    )
}

export default CreatePoint