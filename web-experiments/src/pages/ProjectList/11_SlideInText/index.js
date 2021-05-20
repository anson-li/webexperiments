import anime from 'animejs';
import {
  gsap, Power4,
} from 'gsap';
import {
  SplitText,
} from 'gsap/SplitText';
import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import TextLogo from '../../../common/TextLogo';
import WithTransition from '../../../common/WithTransition';
import styles from './style.module.scss';

gsap.registerPlugin(SplitText);

class SlideInText extends PureComponent {
  constructor (props) {
    super(props);
    this.animatedelements = null;
    this.animatedelementsdescription = null;
  }

  componentDidMount () {
    this.props.hideLoader();
    this.props.hideFollow();
    this.animatedelements = new SplitText(this.animatedtitle, {
      type: 'chars',
    });

    // Template for rolling items up into the page
    gsap.set(this.animatedtitle, {
      perspective: '600px',
      perspectiveOrigin: '100px',
      transformOrigin: 'center',
    });
    gsap.set(this.animatedelements.chars, {
      backfaceVisibility: 'hidden',
      z: 300,
    });
    gsap.from(this.animatedelements.chars, 1.0, {
      delay: 1,
      ease: Power4,
      opacity: 0,
      rotationX: '180',
      stagger: 0.1,
      transformOrigin: '50% 50% 50px',
    });

    this.animatedelementsdescription = new SplitText(this.animateddescription, {
      type: 'lines',
    });
    gsap.set(this.animatedelementsdescription.lines, {
      backfaceVisibility: 'hidden',
      transformOrigin: 'center center -20px',
    });
    gsap.from(this.animatedelementsdescription.lines, 1.0, {
      delay: 1.5,
      ease: Power4,
      opacity: 0,
      rotationX: '-180',
      stagger: 0.1,
    });

    gsap.set(this.animatedimage, {
      perspective: '1000px',
      perspectiveOrigin: '200px',
      transformOrigin: 'center',
    });
    gsap.set(this.animatedinnerimage, {
      backfaceVisibility: 'hidden',
      z: 300,
    });
    gsap.from(this.animatedinnerimage, 1.0, {
      delay: 1,
      ease: Power4,
      opacity: 0,
      rotationX: '180',
      stagger: 0.1,
      transformOrigin: '50% 50% 100px',
    });
  }

  hidePage () {
    anime.remove(this.el);

    return anime({
      duration: 0,
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  animateIn () {
    anime.remove(this.el);

    return anime({
      delay: 1000,
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: [0, 1],
      targets: this.el,
    }).finished;
  }

  animateOut () {
    anime.remove(this.el);
    this.props.showFollow();
    const {showLoader} = this.props;
    showLoader();

    return anime({
      duration: 1000,
      easing: 'easeOutExpo',
      opacity: 0,
      targets: this.el,
    }).finished;
  }

  render () {
    const {cursorHover, cursorUnhover} = this.props;

    return (
      <div
        className={styles['slidein-background']}
        id='generative-art'
        ref={(element) => {
          this.el = element;
        }}>
        <TextLogo
          hover={cursorHover}
          unhover={cursorUnhover}
        />
        <div className={styles['page-content']}>
          <div
            className={styles['animated-text']}
            ref={(element) => {
              this.animatedtitle = element;
            }}>
            TEXT.
          </div>
          <div
            className={styles['animated-image']}
            ref={(element) => {
              this.animatedimage = element;
            }}>
            <img
              alt='Card alternate'
              ref={(element) => {
                this.animatedinnerimage = element;
              }}
              src='https://unsplash.it/1920/1080?random=1' />
          </div>
          <div
            className={styles['animated-description']}
            ref={(element) => {
              this.animateddescription = element;
            }}>
            {/* Paleo celiac flexitarian meh distillery selvage. Squid tattooed retro plaid organic raclette. 8-bit you probably
            haven heard of them tacos before they sold out everyday carry celiac williamsburg. Austin VHS normcore, food truck
            flexitarian brunch DIY narwhal twee tacos keffiyeh. Tumeric vinyl +1 fixie swag umami. Skateboard four loko plaid,
            hella umami la croix 8-bit copper mug tacos scenester.

            Prism vegan subway tile cornhole quinoa la croix squid. Narwhal pug banjo, whatever pinterest scenester lomo celiac kinfolk.
            Letterpress seitan next level, master cleanse pork belly selfies literally readymade post-ironic put a bird on it ugh asymmetrical
            8-bit bespoke. 90s ramps vinyl crucifix, pop-up hell of helvetica hashtag vegan tumeric disrupt subway tile succulents lomo.

            Chia organic four loko bitters, meggings raclette cred tbh mixtape distillery mlkshk brooklyn whatever cray. Hammock migas
            pinterest echo park kale chips drinking vinegar. Actually four dollar toast distillery, chicharrones slow-carb chartreuse trust
            fund shabby chic thundercats whatever waistcoat 8-bit. Four dollar toast microdosing chambray single-origin coffee selvage copper
            mug. Pop-up subway tile fashion axe iceland listicle chartreuse chicharrones vinyl craft beer poke chillwave ethical.
            Cronut kickstarter activated charcoal, brooklyn bitters hell of brunch sustainable listicle swag ramps four dollar toast gentrify.
            Air plant chillwave succulents flannel.

            Bicycle rights dreamcatcher franzen offal. Pitchfork PBB la croix meggings jianbing chicharrones 8-bit etsy gluten-free. Franzen
            bitters seitan vaporware, aesthetic VHS chambray lo-fi freegan before they sold out hexagon you probably have heard of them coloring book.
            Succulents actually forage, hexagon craft beer butcher vape meditation keytar. Kale chips truffaut jianbing chicharrones artisan cardigan
            bushwick tofu sriracha hoodie vape hashtag. Umami trust fund shoreditch green juice, PBB quinoa shabby chic.

            Jean shorts hell of hoodie hashtag, heirloom salvia tumeric swag distillery photo booth before they sold out flannel enamel pin.
            Bitters mlkshk master cleanse paleo tbh coloring book mumblecore chillwave 3 wolf moon irony polaroid +1 disrupt enamel pin.
            Godard cold-pressed deep v vegan semiotics lo-fi. Dreamcatcher master cleanse snackwave whatever thundercats meh retro post-ironic yr kickstarter.
            Scenester blog chillwave selvage, shabby chic cornhole bespoke banh mi actually PBR unicorn +1.

            Tattooed cardigan hexagon freegan iceland succulents. Activated charcoal vice marfa mixtape, roof party iceland art party austin
            meggings DIY polaroid. Edison bulb kogi vinyl, mixtape marfa poke taiyaki succulents irony echo park disrupt hoodie. Lyft poke listicle
            tilde raclette hoodie pinterest crucifix hella roof party raw denim XOXO. Heirloom irony organic, marfa sustainable intelligentsia austin.

            Kombucha occupy kinfolk swag VHS, ramps before they sold out quinoa flannel. Kogi succulents banh mi everyday carry you probably have heard
            of them, knausgaard mlkshk ramps intelligentsia tumblr coloring book readymade cold-pressed before they sold out. Ramps PBR street
            art humblebrag, cred godard lyft keffiyeh waistcoat gluten-free. Brunch hexagon bespoke, bushwick photo booth snackwave mixtape deep v
            affogato knausgaard viral jean shorts.

            Semiotics tattooed af blue bottle keffiyeh raw denim poke, raclette live-edge trust fund meditation 90. Kitsch plaid paleo irony. Brooklyn
            keytar aesthetic dreamcatcher asymmetrical deep v cred bitters roof party lo-fi kitsch sartorial. Roof party butcher enamel pin fingerstache
            tbh pitchfork neutra pickled. Narwhal aesthetic succulents 3 wolf moon dreamcatcher taxidermy pork belly thundercats coloring book vaporware
            gastropub. Celiac messenger bag heirloom photo booth church-key biodiesel seitan vaporware +1 small batch.

            Tumblr tacos twee copper mug, knausgaard selfies 90 la croix yuccie heirloom. Green juice tacos umami distillery, tumeric selvage salvia
            cronut synth wayfarers messenger bag. Hot chicken offal celiac unicorn prism artisan truffaut, meh cloud bread ramps sriracha mlkshk
            shoreditch. Farm-to-table fingerstache cronut etsy chambray PBR, fam glossier green juice poke intelligentsia retro kogi squid selfies.
            Gluten-free hashtag farm-to-table, bicycle rights fanny pack glossier hot chicken put a bird on it craft beer forage fashion axe tilde offal kitsch.

            Dreamcatcher taxidermy woke keytar bushwick gastropub. Cliche pok pok shoreditch, direct trade taiyaki kale chips leggings vinyl pug. Pickled
            cloud bread direct trade hot chicken readymade crucifix mumblecore sustainable umami health goth food truck authentic microdosing kogi. Trust
            fund sartorial offal bespoke slow-carb adaptogen. Echo park hexagon kale chips, viral trust fund flannel craft beer banjo gentrify wolf man
            bun four loko pabst chillwave YOLO.

            Mlkshk brooklyn kombucha, tote bag selfies tousled plaid organic kogi drinking vinegar flannel mustache asymmetrical copper mug succulents.
            Intelligentsia etsy lo-fi yr 3 wolf moon. Single-origin coffee af portland fanny pack, irony street art sartorial letterpress jean shorts
            paleo thundercats viral four dollar toast pitchfork keffiyeh. Cray tumblr trust fund poke snackwave iPhone.

            Whatever chillwave meditation, try-hard cloud bread cornhole brunch hella wayfarers four dollar toast freegan edison bulb. Pork belly fam
            squid lumbersexual hot chicken dreamcatcher DIY freegan meditation art party tousled organic flexitarian health goth. Tacos blue bottle
            brooklyn offal fashion axe cardigan. Roof party four loko vaporware live-edge XOXO. Lyft paleo vinyl helvetica aesthetic activated charcoal,
            farm-to-table selfies single-origin coffee. */}
          </div>
        </div>
      </div>
    );
  }
}

SlideInText.propTypes = {
  cursorHover: PropTypes.func.isRequired,
  cursorUnhover: PropTypes.func.isRequired,
  hideFollow: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  showFollow: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

export default WithTransition(SlideInText);
