import React, { useEffect, useRef } from 'react'
import dateFormat from "dateformat";
import { addCommas } from '../helpers';

function Sparkline(props) {
    const canvasRef = useRef(null);
    let contextRef = useRef(null);
    let prices_scaled;
    const unit = props.width / (7 * 24)
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = props.width;
        canvas.height = props.height;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        const context = canvas.getContext("2d")
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = props.color;
        context.lineWidth = 0.5;
        contextRef.current = context;
        draw();

    }, [])

    const drawTooltip = (offsetX) => {
        clear_canvas()
        contextRef.current.strokeStyle = "#212932";
        contextRef.current.lineWidth = 2;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX / 2, 0);
        contextRef.current.lineTo(offsetX / 2, props.height);
        contextRef.current.stroke();
        contextRef.current.strokeStyle = props.color;
        contextRef.current.lineWidth = 0.5;
        const index_information = parseInt(props.sparkline_in_7d.price.length * offsetX / props.width)
        var date = new Date(Date.now())
        date.setHours(date.getHours() - (props.sparkline_in_7d.price.length - index_information));
        var string_date = dateFormat(date, "  mmmm dS, h:MM TT")
        if (index_information < props.sparkline_in_7d.price.length) {
            const x = (offsetX < props.width / 2) ? offsetX / 2 : offsetX / 2 - 100;
            writeTooltipText('  $' + addCommas(props.sparkline_in_7d.price[index_information].toFixed(2)), string_date, x, 10)
        }
    }

    const writeTooltipText = (tooltip_text, string_date, x, y) => {
        contextRef.current.font = "7pt Roboto";
        contextRef.current.fillStyle = "white";
        contextRef.current.textBaseline = tooltip_text;
        contextRef.current.fillText(tooltip_text, x, y);
        contextRef.current.fillText(string_date, x, y + 10);
    }

    const showTooltip = ({ nativeEvent }) => {
        const { offsetX } = nativeEvent;
        drawTooltip(offsetX);
    }

    const clear_canvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")
        context.fillStyle = "#2b3541"
        context.fillRect(0, 0, canvas.width, canvas.height)
        draw()
    }

    const draw = () => {
        contextRef.current.beginPath();
        const max_val = Math.max(...props.sparkline_in_7d.price)
        const min_val = Math.min(...props.sparkline_in_7d.price)
        prices_scaled = props.sparkline_in_7d.price.slice()
        for (var i = 0, length = prices_scaled.length; i < length; i++) {
            prices_scaled[i] = 0.5 * props.height - (0.5 * props.height * (prices_scaled[i] - min_val) / (max_val - min_val));
            contextRef.current.lineTo(i * unit, prices_scaled[i]);
            contextRef.current.stroke();
        }

    };

    return (<canvas ref={canvasRef} onMouseMove={props.showTooltip ? showTooltip : null} onMouseOut={props.showTooltip ? clear_canvas : null} />);
}

export default Sparkline;
