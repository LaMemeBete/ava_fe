import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { addCommas } from '../helpers';

import Sparkline from './Sparkline';
import "./CryptoCard.css";

function CryptoCard(props) {
    const [open, setOpen] = useState(true);
    return (<div style={{ marginBottom: '5px' }}><div className='container' onClick={() => setOpen(!open)}>
        <Image width="30" src={props.crypto.image} />
        <div className="col col-1">
            <div className="title">
                {props.crypto.symbol.toUpperCase()}-USD
            </div>
            <div className="sub-title">
                {props.crypto.name}
            </div>
        </div>
        <div>
            <Sparkline
                color={(props.crypto.price_change_percentage_24h < 0 ? "#d8744b" : "#63984e")}
                sparkline_in_7d={props.crypto.sparkline_in_7d}
                width={200}
                showTooltip={false}
                height={100}
            />
        </div>
        <div className="col col-2">
            <div className="title">
                ${addCommas(props.crypto.total_volume)}
            </div>
            <div className="sub-title">
                24h volume
            </div>
        </div>
        <div className="col col-3">
            <div className="title">
                ${addCommas(props.crypto.current_price)}
            </div>
            <div className={"sub-title " + (props.crypto.price_change_percentage_24h < 0 ? "red" : "green")}>
                {addCommas(props.crypto.price_change_percentage_24h)}%
            </div>
        </div>

    </div>

        <div className="container-sparkline">

            {open ? null :
                <div style={{ textAlign: "center" }}>
                    <hr className="rounded" width="90%" />
                    <br></br>
                    <Sparkline
                        color={(props.crypto.price_change_percentage_24h < 0 ? "#d8744b" : "#63984e")}
                        sparkline_in_7d={props.crypto.sparkline_in_7d}
                        width={window.innerWidth - 0.2 * window.innerWidth}
                        height={200}
                        showTooltip={true}
                    />
                </div>}
        </div></div>);
}

export default CryptoCard;
