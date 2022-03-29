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
        <a data-tip data-for={'tooltip_'+props.instrument.name} ><ion-icon name="warning-outline"></ion-icon></a>
        <ReactTooltip id={'tooltip_'+props.instrument.name} type='error'>
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
            <span className={(props.instrument.emprunte ? ' btn emprunte dot' : 'btn libre dot')}>
        </span>
  </div>
</div>

    );
}

export default EmpruntInstrumentItem;
