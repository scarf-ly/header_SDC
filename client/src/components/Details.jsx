import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'));

const Button = styled.button`
  font-size: 12px;
  color: #999999;
  padding: 0 6px;
  margin-left: 10px; 
`;

const DetailsHeaderTitle = styled.h2`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans serif;
  color: #D32323;
  font-weight: bold;
  font-size: 21px;
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
};

const monthlyTrendStyle = {
  display: 'inline-block',
  // justifyContent: 'flex-start',
};

const yearContainer = {
  display: 'inline-block',
  // justifyContent: 'space-between',
  marginLeft: 120,
};

const yearStyle = {
  padding: 10,
  height: 30,
};

const checkStyle = {
  width: '5px'
}

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentYearToggled: false,
      lastYearToggled: false,
      twoYearsAgoToggled: false,
      threeYearsAgoToggled: false,
      fourYearsAgoToggled: false,
    };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(e) {
    const classname = e.target.className;
    const state = Object.assign({}, this.state)
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

  render () {
    return(
      <div>
        <Button
          className="details"
          onClick={this.props.openDetailsModal}
        >Details
        </Button>
        <Modal
          isOpen={this.props.detailsModalStatus}
          onRequestClose={this.props.closeDetailsModal}
          style={detailsStyle}
        >
          <div>
            <DetailsHeaderTitle>Rating Details</DetailsHeaderTitle>
          </div>
          <hr/>
          <div className="modal-body">
            <div className="graph">
              <div className="month-trend" style={monthlyTrendStyle}>
                <MonthTrendTitle>Monthly Trend</MonthTrendTitle>
                <div style={yearContainer}>
                  <YearsTitle onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.currentYearToggled.toString()} className="current-year" style={yearStyle}>2019</YearsTitle>
                  <YearsTitle onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.lastYearToggled.toString()} className="last-year" style={yearStyle}>2018</YearsTitle>
                  <YearsTitle onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.twoYearsAgoToggled.toString()} className="two-years-ago" style={yearStyle}>2017</YearsTitle>
                  <YearsTitle onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.threeYearsAgoToggled.toString()} className="three-years-ago" style={yearStyle}>2016</YearsTitle>
                  <YearsTitle onMouseOver={this.toggleState} onMouseOut={this.toggleState} id={this.state.fourYearsAgoToggled.toString()} className="four-years-ago" style={yearStyle}>2015</YearsTitle>
                </div>
              </div>
              <div>
                <div>
                  <svg className="graph" height="195" width="490">
                    <g className="grid x-grid">
                      <line x1="90" x2="90" y1="5" y2="370"></line>
                    </g>
                    <g className="grid y-grid">
                      <line x1="90" x2="705" y1="370" y2="370"></line>
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
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="20" cy="70" data-value="3" r="5"></circle>
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="60" cy="55" data-value="3.5" r="5"></circle>
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="100" cy="40" data-value="4" r="5"></circle>
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="140" cy="40" data-value="4" r="5"></circle>
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="180" cy="25" data-value="4.5" r="5"></circle>
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="220" cy="55" data-value="4" r="5"></circle>
                      <circle stroke="#C53926" fill="white" strokeWidth="2" cx="260" cy="70" data-value="3" r="5"></circle>
                    </g>
                    <polyline points="20,70 60,55 100,40 140,40 180,25 220,55 260,70" fill="#F5D9D6" fillOpacity="0.8" stroke="#C53926" strokeWidth="2"/>
                    <polyline points="20,160 460,160" fill="none" stroke="grey"/>
                    <polyline points="20,130 460,130" fill="none" stroke="grey"/>
                    <polyline points="20,100 460,100" fill="none" stroke="grey"/>
                    <polyline points="20,70 460,70" fill="none" stroke="grey"/>
                    <polyline points="20,40 460,40" fill="none" stroke="grey"/>
                    <polyline points="20,10 460,10" fill="none" stroke="grey"/>
                    <polyline points="20,160 20,10" fill="none" stroke="grey"/>
                    <polyline points="60,160 60,10" fill="none" stroke="grey"/>
                    <polyline points="100,160 100,10" fill="none" stroke="grey"/>
                    <polyline points="140,160 140,10" fill="none" stroke="grey"/>
                    <polyline points="180,160 180,10" fill="none" stroke="grey"/>
                    <polyline points="220,160 220,10" fill="none" stroke="grey"/>
                    <polyline points="260,160 260,10" fill="none" stroke="grey"/>
                    <polyline points="300,160 300,10" fill="none" stroke="grey"/>
                    <polyline points="340,160 340,10" fill="none" stroke="grey"/>
                    <polyline points="380,160 380,10" fill="none" stroke="grey"/>
                    <polyline points="420,160 420,10" fill="none" stroke="grey"/>
                    <polyline points="460,160 460,10" fill="none" stroke="grey"/>
                  </svg>
                </div>
              </div>
              <DetailsMonthlyChanges>Understand how a business' rating changes month-to-month. Learn More</DetailsMonthlyChanges>
            </div>
            <OverallRatingTitle>Overall Rating</OverallRatingTitle>
            <hr/>
            <DetailsReviewCount>Munching since 2009 with 2129 reviews</DetailsReviewCount>
            <div>
              <svg className="chart" width="470" height="170" role="img">
                <title className="title">star bar chart</title>
                <g className="bar-star-5">
                  <rect width="370" height="30"></rect>
                  <text x="375" y="15" dy=".35em">788</text>
                </g>
                <g className="bar-star-4">
                  <rect width="300" height="30" y="33"></rect>
                  <text x="305" y="48" dy=".35em">653</text>
                </g>
                <g className="bar-star-3">
                  <rect width="250" height="30" y="65"></rect>
                  <text x="255" y="80" dy=".35em">364</text>
                </g>
                <g className="bar-star-2">
                  <rect width="200" height="30" y="97"></rect>
                  <text x="205" y="112" dy=".35em">198</text>
                </g>
                <g className="bar-star-1">
                  <rect width="100" height="30" y="130"></rect>
                  <text x="105" y="145" dy=".35em">126</text>
                </g>
              </svg>
            </div>
            <DetailsFooter>We calculate the overall star rating using only reviews that our automated software currently recommends. Learn More</DetailsFooter>
          </div>
        </Modal>
      </div>
    )
  };
};

export default Details;
