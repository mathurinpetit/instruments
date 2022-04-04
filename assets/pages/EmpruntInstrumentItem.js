import React from 'react';
import UtilisateurLocalMapModal from "./UtilisateurLocalMapModal";
import ReactTooltip from 'react-tooltip';

function EmpruntInstrumentItem(props) {

    return (

<div className="d-flex w-100">
  <div className="col">
    <h4 className="intrumentNomLigne">{props.instrument.name}&nbsp;</h4>
    <h6>{props.instrument.type}&nbsp;</h6>
  </div>
  <div className="col">
    { props.instrument.description &&
      <div>
        <a data-event={"click"} data-tip='tooltip' data-for={'tooltip_'+props.instrument.name} className="btn btn-link btn-lg"><ion-icon name="warning-outline"></ion-icon></a>
        <ReactTooltip id={'tooltip_'+props.instrument.name} type='error' globalEventOff={"click"} >
          <span>{props.instrument.description}</span>
        </ReactTooltip>
      </div>
    }
  </div>
  <span className="col text-left">
    {props.instrument.emprunte ? '' : 'Disponible'}
    {props.emprunteParMoi ? 'Emprunté par moi' : props.instrument.emprunteurNom }
  </span>&nbsp;&nbsp;
  { (props.instrument.emprunteurAdresse)?
      <UtilisateurLocalMapModal instrument={props.instrument} />
      :
      <div className="col"></div>
  }
  &nbsp;<div className="p-1">
            { (props.emprunteParMoi)?
            <span className="btn mine dot"><ion-icon name="checkmark-circle-outline" style={{marginTop: -10 + 'px',marginLeft: -16 + 'px', width: 2+ "rem", height: 2+"rem"}} ></ion-icon></span>
            :
            <span className={(props.instrument.emprunte ? 'btn emprunte dot' : 'btn libre dot')}></span>
            }
  </div>
</div>

    );
}

export default EmpruntInstrumentItem;
