import React, {
  PureComponent,
} from 'react';
import FadeText from '../../../../common/FadeText';

class MainText extends PureComponent {
  render () {
    return (
      <div className='full-page'>
        <div className='flex-container container '>
          <div className='col-md-12 mid-center'>
            <div className='spacer-sm d-lg-none' />
            <FadeText
              id='main-text'
              text="ANSON'S WEB EXPERIMENTS"
              type='h1'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainText;
