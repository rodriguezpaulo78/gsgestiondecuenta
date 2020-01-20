import React from 'react';
import PropTypes from 'prop-types';

function convertToRow(obj, columnsNameArray, keyNameIndex = ""){
    let td = [];
    if (keyNameIndex !== ""){
        td.push("<td key={-1} scope='row'>" + obj[keyNameIndex] + "</td>");
    }

    for (var i = 0; i < columnsNameArray.length; i++){
        td.push("<td key={i + 'rt'} scope='row'>" + obj[columnsNameArray[i]] + "</td>");
    }

    return td;
}

const TableBootstrap = (props) => (
    <table className="table table-striped table-bordered table-table table-hover" style={{'height': '90px'}}>
        <thead>
        <tr>
            {
                props.isKeyIndex ?
                    props.headersNames.map((ele, i) => {
                        if (i === props.keyIndexRow){
                            return <th key={i + "cl"} scope="col">{ele}</th>
                        }else{
                            return <th key={i + "cl"} scope="col">{ele}</th>

                        }
                    })
                    :
                    props.headersNames.map((ele, i) => {
                        return <th scope="col">{ele}</th>
                    })
            }
        </tr>
        </thead>
        <tbody>
        {
            props.isKeyIndex ?
                props.data.map((elem, i) => {
                    return (
                        <tr key={i}>
                            <td scope="row">{elem[props.keyNameRow]}</td>
                            <td >{elem[props.namesColumnData[0]]}</td>
                            <td >{elem[props.namesColumnData[1]]}</td>
                            <td >{elem[props.namesColumnData[2]]}</td>
                            <td >{elem[props.namesColumnData[3]]}</td>
                            <td >{elem[props.namesColumnData[4]]}</td>
                            <td >{elem[props.namesColumnData[5]]}</td>
                            <td >{elem[props.namesColumnData[6]]}</td>
                        </tr>
                    );
                }):
                props.data.map((elem, i) => {
                    let indexNameColumnData = 0;
                    return (
                        <tr key={i}>
                            {
                                props.data.map((elemRow, iRow) => {
                                    indexNameColumnData++;
                                    return (<td>{elemRow[props.namesColumnData[indexNameColumnData]]}</td>)
                                })
                            }
                        </tr>
                    );
                })
        }
        </tbody>
        <tfoot>
        <tr>
            {
                props.isKeyIndex ?
                    props.headersNames.map((ele, i) => {
                        if (i === props.keyIndexRow){
                            return <th key={i + "cl"} scope="col">{ele}</th>
                        }else{
                            return <th key={i + "cl"} scope="col">{ele}</th>

                        }
                    })
                    :
                    props.headersNames.map((ele, i) => {
                        return <th scope="col">{ele}</th>
                    })
            }
        </tr>
        </tfoot>
    </table>
);

TableBootstrap.propTypes = {
    isKeyIndex: PropTypes.bool.isRequired,
    keyIndexRow: PropTypes.number,
    headersNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.array,
    keyNameRow: PropTypes.string,
    namesColumnData: PropTypes.array
}

export default TableBootstrap;