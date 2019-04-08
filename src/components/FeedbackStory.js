import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Image from 'react-bootstrap/Image';

class FeedbackStory extends Component {
    state = {open:false}

    componentDidMount () {
        this.setState({open:false})
    }


    render() {
        
            const { open } = this.state;
            var substringer = this.props.storyItem.description.length / 2
            if (this.props.storyItem.description.length > 150) {
                var title = `${this.props.storyItem.description.substring(0,150)}...`
            }
            else { title = this.props.storyItem.description}

            // var recievedDate = this.props.storyItem.requested_datetime.substring(0,10)
            var recievedDate = this.props.storyItem.requested_datetime.substring(8,10) +"."+ this.props.storyItem.requested_datetime.substring(5,7) + "." + this.props.storyItem.requested_datetime.substring(0,4)

            var replyDate = (this.props.storyItem.status === "closed") ? this.props.storyItem.updated_datetime.substring(8,10) +"."+ this.props.storyItem.updated_datetime.substring(5,7) + "." + this.props.storyItem.updated_datetime.substring(0,4) : ""

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
                 <h5>Palautteen päiväys: {recievedDate}</h5>
                 <p>{this.props.storyItem.description}</p>
                 {(this.props.storyItem.media_url !== null) ? <Image src={this.props.storyItem.media_url} width="33%" height="33%" rounded /> : ""}
                 {(this.props.storyItem.status === "closed") ? <h5>Vastauksen päiväys: {replyDate}</h5> : <h6>Vastaava yksikkö: {this.props.storyItem.agency_responsible}</h6>}
                 {(this.props.storyItem.status === "closed") ? <p>{this.props.storyItem.status_notes.substring(0,stringEnder)}</p> : ""}
                 {(this.props.storyItem.status === "closed") ? <h6>Vastaava yksikkö: {this.props.storyItem.agency_responsible}</h6> : ""}

                  </div>
                </Collapse>
              </React.Fragment>
        );
    }
}

export default FeedbackStory;