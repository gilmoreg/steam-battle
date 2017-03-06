/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import SteamBattle from '../../js/components/SteamBattle';

const should = chai.should();

describe('SteamBattle component', () => {
  it('should render the component properly', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<SteamBattle />);
    const result = renderer.getRenderOutput();
    result.props.store.should.exist;
    // TODO what else to test?
  });
});

/*
console.log('SteamBattle', result);
SteamBattle { '$$typeof': Symbol(react.element),     
  type:                                              
   { [Function: Provider]                            
     propTypes:                                      
      { store: [Function: bound checkType],          
        children: [Function: bound checkType] },     
     childContextTypes: { store: [Function: bound che
ckType] } },                                         
  key: null,                                         
  ref: null,                                         
  props:                                             
   { store:                                          
      { dispatch: [Function],                        
        subscribe: [Function: subscribe],            
        getState: [Function: getState],              
        replaceReducer: [Function: replaceReducer] },
                                                     
     children:                                       
      { '$$typeof': Symbol(react.element),           
        type: [Object],                              
        key: null,                                   
        ref: null,                                   
        props: {},                                   
        _owner: null,                                
        _store: {} } },                              
  _owner: null,                                      
  _store: {} }                                       

*/
