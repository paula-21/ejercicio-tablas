import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ui-paula-perez.css.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <ui-paula-perez></ui-paula-perez>
 * ```
 */
export class UiPaulaPerez extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      name: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.name = 'Cells';
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('ui-paula-perez-shared-styles'),
    ];
  }

  render() {
    return html`
      <h2>bienvenido a ${this.name}</h2>
      <div class="contenedor">
        <strong>
          <p>Mi primer componente cells</p>
        </strong>
        <select name="" id="">
          <option value="">gato</option>
          <option value="">perro</option>
        </select>
        <button>continuar</button>
        <slot></slot>
      </div>
    `;
  }
}
