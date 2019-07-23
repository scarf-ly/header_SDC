import React from 'react';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';
import axios from 'axios';
import styled from 'styled-components';

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
  }

  componentDidMount() {
    console.log('axios request to server');
    let urlStrings = location.href.split('/');
    let num = urlStrings [urlStrings.length - 2]; 
    axios.get(`/header/${num}`)
      .then(res => {
        console.log('this is the data',res.data)
        const state = Object.assign({}, this.state);
        state.currentView = res.data[0];
        this.setState(state);
      })
      .catch(err => {
       console.log(err)
      });
  }

  openDetailsModal() {
    document.body.style.overflow = 'hidden'
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = true;
    state.modalStyle = detailsStyle;
    this.setState(state);
  }

  openShareModal() {
    document.body.style.overflow = 'hidden'
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = true;
    state.modalStyle = shareStyle;
    this.setState(state);
  }

  openSaveModal() {
    document.body.style.overflow = 'hidden'
    const state = Object.assign({}, this.state);
    state.saveModalIsOpen = true;
    state.modalStyle = saveStyle;
    this.setState(state);
  }

  closeDetailsModal() {
    document.body.style.overflow = 'auto'
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = false;
    this.setState(state);
  }

  closeShareModal() {
    document.body.style.overflow = 'auto'
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = false;
    this.setState(state);
  }

  closeSaveModal() {
    document.body.style.overflow = 'auto'
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
