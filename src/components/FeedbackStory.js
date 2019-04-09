import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Image from 'react-bootstrap/Image';

// Component renders the feedback-specific information in a collapse element. 
// Content varies by the status of the feedback.
// TODO - Do some elegant styling for the content
// TODO - Add location data to make some comments more reasonable

class FeedbackStory extends Component {
  state = { open: false }

  componentDidMount() {
    this.setState({ open: false })
  }


  render() {

    const { open } = this.state;
    if (this.props.storyItem.description.length > 120) {
      var title = `${this.props.storyItem.description.substring(0, 120)}...`
    }
    else { title = this.props.storyItem.description }

    var recievedDate = this.props.storyItem.requested_datetime.substring(8, 10) + "." + this.props.storyItem.requested_datetime.substring(5, 7) + "." + this.props.storyItem.requested_datetime.substring(0, 4)

    var replyDate = (this.props.storyItem.status === "closed") ? this.props.storyItem.updated_datetime.substring(8, 10) + "." + this.props.storyItem.updated_datetime.substring(5, 7) + "." + this.props.storyItem.updated_datetime.substring(0, 4) : ""

    var stringEnder = (this.props.storyItem.status === "closed") ? this.props.storyItem.status_notes.search(/ystävällisin/i) : ""

    return (
      <React.Fragment>
        <Button
          variant="outline-light"
          onClick={() => this.setState({ open: !open })}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          {title}
        </Button>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">
          <hr/>
            <h5>Palautteen päiväys: {recievedDate}</h5>
            <p className="StoryDescription">{this.props.storyItem.description}</p>
            {(this.props.storyItem.lat !== null & this.props.storyItem.long !== null) ? <div className="StoryGmapsLink"> <Button variant="outline-light" href={`https://www.google.com/maps/search/?api=1&query=${this.props.storyItem.lat},${this.props.storyItem.long}`} target="_blank" rel="noopener noreferrer">Avaa palautteen sijainti Google Mapsissa</Button> </div>: ""}
            
            {(this.props.storyItem.media_url !== null) ? <div className="StoryMediaEmbed"><Image src={this.props.storyItem.media_url} width="33%" height="33%" rounded /> </div> : ""}
            
            {(this.props.storyItem.status === "closed") ? <h5>Vastauksen päiväys: {replyDate}</h5> : <h6>Vastaava yksikkö: {this.props.storyItem.agency_responsible}</h6>}
            {(this.props.storyItem.status === "closed") ? <p className="StoryDescription">{this.props.storyItem.status_notes.substring(0, stringEnder)}</p> : ""}
            {(this.props.storyItem.status === "closed") ? <h6>Vastaava yksikkö: {this.props.storyItem.agency_responsible}</h6> : ""}

          </div>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default FeedbackStory;