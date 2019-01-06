import React, { Component } from 'react';
import { connect } from 'react-redux';

import PrimaryLayout from 'components/PrimaryLayout';
import { getOffer } from 'services/APIs';

import OfferDetails from './components/OfferDetails';
import OfferContent from './components/OfferContent';

import { toggleLoader } from 'data/store/actions';

class Offer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offer: null,
      contactVisible: false,
    };

    this.handleContact = this.handleContact.bind(this);
  }

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;

    dispatch(toggleLoader(true));

    getOffer(id)
      .then((response) => {
        dispatch(toggleLoader(false));

        if (!response || response.code !== 200) { //eslint-disable-line
          return;
        }

        this.setState({
          offer: { ...response },
        });
      });
  }

  handleContact() {
    this.setState({
      contactVisible: true,
    });
  }

  render() {
    const { offer, contactVisible } = this.state;

    return (
      <PrimaryLayout
        headerTitle={offer && offer.name}
        sidebar={offer && <OfferDetails details={offer.details} />}
      >
        <div className="single-offer">
          { offer &&
            <OfferContent
              offer={offer}
              onClick={this.handleContact}
              contactVisible={contactVisible}
            />
          }
        </div>
      </PrimaryLayout>
    );
  }
}

export default connect()(Offer);
