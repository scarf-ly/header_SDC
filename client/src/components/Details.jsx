import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'));

const Button = styled.button`
  font-size: 12px;
  color: #999999;
  padding: 0 6px;
  margin-left: 10px;
  height: 20px;
  border-radius: 2px;
  outline: none;
  &:hover {
    cursor: pointer;
    background: rgb(245, 245, 245);
    color: #333;
  }
`;

const DetailsHeaderTitle = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #D32323;
  font-weight: bold;
  font-size: 21px;
  display: inline-block;
`;

const MonthTrendTitle = styled.div`
  display: inline-block;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #333333;
  font-weight: bold;
  font-size: 14px;
`;

const YearsTitle = styled.span`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #666666;
  font-size: 14px;
  &:hover {
    border-bottom: 3px solid #D43E29;
    cursor: pointer;
  }
`;

const GraphAxisTitle = styled.text`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #666666;
  font-size: 11px;
`;

const DetailsMonthlyChanges = styled.small`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #333333;
  font-size: 12px;
`;

const OverallRatingTitle = styled.h4`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #333333;
  font-size: 14px;
`;

const DetailsReviewCount = styled.p`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #333333;
  font-size: 14px;
`;

const DetailsFooter = styled.small`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #333333;
  font-size: 12px;
`;

const FiveStarBar = styled.rect`
  fill: #FCD6D3;
`;

const FourStarBar = styled.rect`
  fill: #FCD6D3;
`;

const ThreeStarBar = styled.rect`
  fill: #FCD6D3;
`;

const TwoStarBar = styled.rect`
  fill: #FFF7CC;
`;

const OneStarBar = styled.rect`
  fill: #FFF7CC;
`;

const Link = styled.a`
  color: #0073bb;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const StarBarFont = styled.text`
  font-color: #666;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  font-size: 12px;
  font-weight: bold;
`;

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
    zIndex: 3,
  },
};

const monthlyTrendStyle = {
  display: 'inline-block',
};

const yearContainer = {
  display: 'inline-block',
  marginLeft: 120,
};

const yearStyle = {
  padding: 10,
  height: 30,
};

const yearSelected = {
  padding: 10,
  height: 30,
  fontWeight: 'bold',
  color: 'black',
};

const DetailDiv = styled.div`
  display: inline-block;
`;

const XButton = styled.div`
  float: right;
  color: #CCC;
  &:hover {
    cursor: pointer;
    color: #333;
  }
`;

const DetailModalHeader = styled.div`
  display: inline-block;
  width: 500px;
  margin-bottom: 20px;
`;


const xAxis = {
  jan: '20',
  feb: '60',
  mar: '100',
  apr: '140',
  may: '180',
  jun: '220',
  jul: '260',
  aug: '300',
  sep: '340',
  oct: '380',
  nov: '420',
  dec: '460',
};

const yAxis = {
  one: '130',
  oneHalf: '115',
  two: '100',
  twoHalf: '85',
  three: '70',
  threeHalf: '55',
  four: '40',
  fourHalf: '25',
  five: '10',
};

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYearToggled: false,
      lastYearToggled: false,
      twoYearsAgoToggled: false,
      threeYearsAgoToggled: false,
      fourYearsAgoToggled: false,
      currentYearClicked: true,
      lastYearClicked: false,
      twoYearsAgoClicked: false,
      threeYearsAgoClicked: false,
      fourYearsAgoClicked: false,
      fiveYearsAgoClicked: false,
    };

    this.currentYear = [];
    this.lastYear = [];
    this.twoYearsAgo = [];
    this.threeYearsAgo = [];
    this.fourYearsAgo = [];

    this.fiveStar = 0;
    this.fourStar = 0;
    this.threeStar = 0;
    this.twoStar = 0;
    this.oneStar = 0;

    this.lastXCoordinate = '';

    this.lineCoordinates = this.currentYear;
    this.barWidth = this.barWidth.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.setLineGraph = this.setLineGraph.bind(this);
    this.countStars = this.countStars.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const state = Object.assign({}, this.state);
    if (this.props.reviewCount !== newProps.reviewCount) {
      state.props = newProps;
      this.setState(state, () => { this.setLineGraph(); this.countStars(); });
    }
  }

  setLineGraph() {
    const stars = ['one', 'two', 'three', 'four', 'five'];
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    const { reviews } = this.props;
    // console.log('look at these reviews', this.props.reviews)
    for (let i = 0; i < reviews.length; i++) {
      // console.log(i)
      let star = reviews[i].star - 1;
      star = stars[star];
      let month = parseFloat(reviews[i].datestamp.split('-')[1]) - 1;
      month = months[month];
      if (i < 12) {
        this.currentYear.push(xAxis[month].concat(',', yAxis[star]));
      }
      if (i >= 12 && i < 24) {
        this.lastYear.push(xAxis[month].concat(',', yAxis[star]));
      }
      if (i >= 24 && i < 36) {
        this.twoYearsAgo.push(xAxis[month].concat(',', yAxis[star]));
      }
      if (i >= 36 && i < 48) {
        this.threeYearsAgo.push(xAxis[month].concat(',', yAxis[star]));
      }
      if (i >= 48 && i < 60) {
        this.fourYearsAgo.push(xAxis[month].concat(',', yAxis[star]));
      }
    }
  }

  countStars() {
    console.log('look at these rev', this.props.reviews);
    this.props.reviews.forEach((val) => {
      console.log(val);
      if (val.star == 1) {
        this.oneStar++;
      } else if (val.star == 2) {
        this.twoStar++;
      } else if (val.star == 3) {
        this.threeStar++;
      } else if (val.star == 4) {
        this.fourStar++;
      } else if (val.star == 5) {
        this.fiveStar++;
      }
    });
  }

  toggleState(e) {
    const classname = e.target.className;
    const state = Object.assign({}, this.state);
    if (classname === 'current-year') {
      state.currentYearToggled = !state.currentYearToggled;
    } else if (classname === 'last-year') {
      state.lastYearToggled = !state.lastYearToggled;
    } else if (classname === 'two-years-ago') {
      state.twoYearsAgoToggled = !state.twoYearsAgoToggled;
    } else if (classname === 'three-years-ago') {
      state.threeYearsAgoToggled = !state.threeYearsAgoToggled;
    } else if (classname === 'four-years-ago') {
      state.fourYearsAgoToggled = !state.fourYearsAgoToggled;
    }
    this.setState(state);
  }

  handleClick(e) {
    const classname = e.target.className.split(' ')[0];
    const state = Object.assign({}, this.state);
    for (const key in state) {
      state[key] = false;
    }
    if (classname === 'current-year') {
      state.currentYearClicked = !state.currentYearClicked;
      if (state.currentYearClicked) {
        this.lineCoordinates = this.currentYear;
      }
    }
    if (classname === 'last-year') {
      state.lastYearClicked = !state.lastYearClicked;
      if (state.lastYearClicked) {
        this.lineCoordinates = this.lastYear;
      }
    }
    if (classname === 'two-years-ago') {
      state.twoYearsAgoClicked = !state.twoYearsAgoClicked;
      if (state.twoYearsAgoClicked) {
        this.lineCoordinates = this.twoYearsAgo;
      }
    }
    if (classname === 'three-years-ago') {
      state.threeYearsAgoClicked = !state.threeYearsAgoClicked;
      if (state.threeYearsAgoClicked) {
        this.lineCoordinates = this.threeYearsAgo;
      }
    }
    if (classname === 'four-years-ago') {
      state.fourYearsAgoClicked = !state.fourYearsAgoClicked;
      if (state.fourYearsAgoClicked) {
        this.lineCoordinates = this.fourYearsAgo;
      }
    }
    this.setState(state);
  }

  barWidth(number) {
    let result = number;
    if (result > 38) {
      result = 38;
    }
    result = (result * 10) + 60;
    return result;
  }

  render() {
    return (
      <DetailDiv>
        <Button
          className="details"
          onClick={this.props.openDetailsModal}
        >
<i className="far fa-chart-bar"></i>
{' '}
Details
</Button>
        <Modal
          isOpen={this.props.detailsModalStatus}
          onRequestClose={this.props.closeDetailsModal}
          style={detailsStyle}
        >
          <DetailModalHeader>
            <DetailsHeaderTitle>Rating Details</DetailsHeaderTitle>
            <XButton onClick={this.props.closeDetailsModal} className="fas fa-times" />
          </DetailModalHeader>
          <hr />
          <div className="modal-body">
            <div className="graph">
              <div className="month-trend" style={monthlyTrendStyle}>
                <MonthTrendTitle>Monthly Trend</MonthTrendTitle>
                <div style={yearContainer}>
                  <YearsTitle onClick={this.handleClick} onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.currentYearToggled.toString()} className="current-year" style={this.state.currentYearClicked ? yearSelected : yearStyle}>2019</YearsTitle>
                  <YearsTitle onClick={this.handleClick} onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.lastYearToggled.toString()} className="last-year" style={this.state.lastYearClicked ? yearSelected : yearStyle}>2018</YearsTitle>
                  <YearsTitle onClick={this.handleClick} onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.twoYearsAgoToggled.toString()} className="two-years-ago" style={this.state.twoYearsAgoClicked ? yearSelected : yearStyle}>2017</YearsTitle>
                  <YearsTitle onClick={this.handleClick} onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.threeYearsAgoToggled.toString()} className="three-years-ago" style={this.state.threeYearsAgoClicked ? yearSelected : yearStyle}>2016</YearsTitle>
                  <YearsTitle onClick={this.handleClick} onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.fourYearsAgoToggled.toString()} className="four-years-ago" style={this.state.fourYearsAgoClicked ? yearSelected : yearStyle}>2015</YearsTitle>
                </div>
              </div>
              <hr />
              <div>
                <div>
                  <svg className="graph" height="195" width="490">
                    <g className="grid x-grid">
                      <line x1="90" x2="90" y1="5" y2="370" />
                    </g>
                    <g className="grid y-grid">
                      <line x1="90" x2="705" y1="370" y2="370" />
                    </g>
                    <g className="labels x-labels">
                      <GraphAxisTitle x="10" y="180">Jan</GraphAxisTitle>
                      <GraphAxisTitle x="50" y="180">Feb</GraphAxisTitle>
                      <GraphAxisTitle x="90" y="180">Mar</GraphAxisTitle>
                      <GraphAxisTitle x="130" y="180">Apr</GraphAxisTitle>
                      <GraphAxisTitle x="170" y="180">May</GraphAxisTitle>
                      <GraphAxisTitle x="210" y="180">Jun</GraphAxisTitle>
                      <GraphAxisTitle x="250" y="180">Jul</GraphAxisTitle>
                      <GraphAxisTitle x="290" y="180">Aug</GraphAxisTitle>
                      <GraphAxisTitle x="330" y="180">Sep</GraphAxisTitle>
                      <GraphAxisTitle x="370" y="180">Oct</GraphAxisTitle>
                      <GraphAxisTitle x="410" y="180">Nov</GraphAxisTitle>
                      <GraphAxisTitle x="450" y="180">Dec</GraphAxisTitle>
                    </g>
                    <g className="labels y-labels">
                      <GraphAxisTitle x="4" y="165">0</GraphAxisTitle>
                      <GraphAxisTitle x="4" y="135">1</GraphAxisTitle>
                      <GraphAxisTitle x="4" y="105">2</GraphAxisTitle>
                      <GraphAxisTitle x="4" y="75">3</GraphAxisTitle>
                      <GraphAxisTitle x="4" y="45">4</GraphAxisTitle>
                      <GraphAxisTitle x="4" y="15">5</GraphAxisTitle>
                    </g>
                    <g className="data" data-setname="average-monthly-star">
                      {
                        this.lineCoordinates.map((value, index) => (
                          <circle stroke="#C53926" fill="white" strokeWidth="2" cx={value.split(',')[0]} cy={value.split(',')[1]} r="5" key={index} />
                        ))
                      }
                    </g>
                    <polyline points={this.lineCoordinates.join()} fill="#F5D9D6" fillOpacity="0" stroke="#C53926" strokeWidth="2" />
                    <polyline points="20,160 460,160" fill="none" stroke="#ddd" />
                    <polyline points="20,130 460,130" fill="none" stroke="#ddd" />
                    <polyline points="20,100 460,100" fill="none" stroke="#ddd" />
                    <polyline points="20,70 460,70" fill="none" stroke="#ddd" />
                    <polyline points="20,40 460,40" fill="none" stroke="#ddd" />
                    <polyline points="20,10 460,10" fill="none" stroke="#ddd" />
                    <polyline points="20,160 20,10" fill="none" stroke="#ddd" />
                    <polyline points="60,160 60,10" fill="none" stroke="#ddd" />
                    <polyline points="100,160 100,10" fill="none" stroke="#ddd" />
                    <polyline points="140,160 140,10" fill="none" stroke="#ddd" />
                    <polyline points="180,160 180,10" fill="none" stroke="#ddd" />
                    <polyline points="220,160 220,10" fill="none" stroke="#ddd" />
                    <polyline points="260,160 260,10" fill="none" stroke="#ddd" />
                    <polyline points="300,160 300,10" fill="none" stroke="#ddd" />
                    <polyline points="340,160 340,10" fill="none" stroke="#ddd" />
                    <polyline points="380,160 380,10" fill="none" stroke="#ddd" />
                    <polyline points="420,160 420,10" fill="none" stroke="#ddd" />
                    <polyline points="460,160 460,10" fill="none" stroke="#ddd" />
                    <polygon points={'20,160 '.concat(',', this.lineCoordinates.join()).concat(',', ' 460,160')} fill="#f5d9d6" fillOpacity="0.6" />
                  </svg>
                </div>
              </div>
              <DetailsMonthlyChanges>
Understand how a business' rating changes month-to-month.
{' '}
<Link>Learn More</Link>
{' '}
 </DetailsMonthlyChanges>
            </div>
            <OverallRatingTitle>Overall Rating</OverallRatingTitle>
            <hr />
            <DetailsReviewCount>
Munching since 2015 with
{' '}
{this.props.reviewCount}
{' '}
reviews
</DetailsReviewCount>
            <div>
              <svg className="chart" width="470" height="170" role="img">
                <title className="title">star bar chart</title>
                <g className="bar-star-5">
                  <FiveStarBar width={this.barWidth(this.fiveStar)} height="30" />
                  <StarBarFont x="10" y="15" dy=".35em">5 stars</StarBarFont>
                  <StarBarFont x={this.barWidth(this.fiveStar) + 5} y="15" dy=".35em">{this.fiveStar}</StarBarFont>
                </g>
                <g className="bar-star-4">
                  <FourStarBar width={this.barWidth(this.fourStar)} height="30" y="33" />
                  <StarBarFont x="10" y="48" dy=".35em">4 stars</StarBarFont>
                  <StarBarFont x={this.barWidth(this.fourStar) + 5} y="48" dy=".35em">{this.fourStar}</StarBarFont>
                </g>
                <g className="bar-star-3">
                  <ThreeStarBar width={this.barWidth(this.threeStar)} height="30" y="65" />
                  <StarBarFont x="10" y="80" dy=".35em">3 stars</StarBarFont>
                  <StarBarFont x={this.barWidth(this.threeStar) + 5} y="80" dy=".35em">{this.threeStar}</StarBarFont>
                </g>
                <g className="bar-star-2">
                  <TwoStarBar width={this.barWidth(this.twoStar)} height="30" y="97" />
                  <StarBarFont x="10" y="112" dy=".35em">2 stars</StarBarFont>
                  <StarBarFont x={this.barWidth(this.twoStar) + 5} y="112" dy=".35em">{this.twoStar}</StarBarFont>
                </g>
                <g className="bar-star-1">
                  <OneStarBar width={this.barWidth(this.oneStar)} height="30" y="130" />
                  <StarBarFont x="10" y="145" dy=".35em">1 star</StarBarFont>
                  <StarBarFont x={this.barWidth(this.oneStar) + 5} y="145" dy=".35em">{this.oneStar}</StarBarFont>
                </g>
              </svg>
            </div>
            <DetailsFooter>
We calculate the overall star rating using only reviews that our automated software currently recommends.
{' '}
<Link>Learn More</Link>
</DetailsFooter>
          </div>
        </Modal>
      </DetailDiv>
    );
  }
}

export default Details;
