import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';

const shareStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 570,
    width: 450,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9,
  },
};

const detailsStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 630,
    width: 500,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9,
  },
};

const saveStyle = {
  content: {
    textAlign: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 640,
    width: 500,
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9,
  },
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderLeftDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 3%;
`;

const HeaderRighttDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 3%;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsModalIsOpen: false,
      shareModalIsOpen: false,
      saveModalIsOpen: false,
      modalStyle: '',
      currentView: {
        avg_stars: 0,
        categories: '',
        name: '',
        reviews: [],
      },
    };

    this.openDetailsModal = this.openDetailsModal.bind(this);
    this.openShareModal = this.openShareModal.bind(this);
    this.openSaveModal = this.openSaveModal.bind(this);

    this.closeDetailsModal = this.closeDetailsModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.closeSaveModal = this.closeSaveModal.bind(this);
    this.addReview = this.addReview.bind(this);
  }

  componentDidMount() {
    console.log('axios request to server');
    const urlStrings = location.href.split('/');
    const num = urlStrings[urlStrings.length - 2];
    axios.get(`/${num}/header`)
      .then((res) => {
        console.log('this is the data', res.data);
        console.log('this is the categories', res.data.reviews);
        const state = Object.assign({}, this.state);
        // state.currentView = res.data[0];
        state.currentView.avg_stars = res.data.header[0].avg_stars;
        state.currentView.name = res.data.header[0].restaurant_name;
        const categText = res.data.categories.map((result) => {
          return result.category;
        });
        state.currentView.categories = categText.join(' ');
        state.currentView.reviews = res.data.reviews;
        this.setState(state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addReview() {
    axios.post(`${num}/header/${reviewID}`, {
      date: 'Fred',
      star: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  openDetailsModal() {
    document.body.style.overflow = 'hidden';
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = true;
    state.modalStyle = detailsStyle;
    this.setState(state);
  }

  openShareModal() {
    document.body.style.overflow = 'hidden';
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = true;
    state.modalStyle = shareStyle;
    this.setState(state);
  }

  openSaveModal() {
    document.body.style.overflow = 'hidden';
    const state = Object.assign({}, this.state);
    state.saveModalIsOpen = true;
    state.modalStyle = saveStyle;
    this.setState(state);
  }

  closeDetailsModal() {
    document.body.style.overflow = 'auto';
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = false;
    this.setState(state);
  }

  closeShareModal() {
    document.body.style.overflow = 'auto';
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = false;
    this.setState(state);
  }

  closeSaveModal() {
    document.body.style.overflow = 'auto';
    const state = Object.assign({}, this.state);
    state.saveModalIsOpen = false;
    this.setState(state);
  }

  render() {
    return (
      <FlexContainer>
        <HeaderLeftDiv>
          <HeaderLeft
            detailsModalStatus={this.state.detailsModalIsOpen}
            openDetailsModal={this.openDetailsModal}
            closeDetailsModal={this.closeDetailsModal}
            detailStyle={this.state.modalStyle}
            restaurantName={this.state.currentView.name}
            categoryNames={this.state.currentView.categories}
            reviewCount={this.state.currentView.reviews.length}
            averageStars={this.state.currentView.avg_stars}
            reviews={this.state.currentView.reviews}
          />
        </HeaderLeftDiv>
        <HeaderRighttDiv>
          <HeaderRight
            shareModalStatus={this.state.shareModalIsOpen}
            openShareModal={this.openShareModal}
            closeShareModal={this.closeShareModal}
            shareStyle={this.state.modalStyle}
            saveModalStatus={this.state.saveModalIsOpen}
            openSaveModal={this.openSaveModal}
            closeSaveModal={this.closeSaveModal}
            saveStyle={this.state.modalStyle}
          />
        </HeaderRighttDiv>
      </FlexContainer>
    );
  }
}

export default App;
