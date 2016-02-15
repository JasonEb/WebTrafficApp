var React = require('react'),
    WebsiteListingStore = require('../stores/website_listing_store.js'),
    Table = require('reactable').Table,
    ListingForm = require('./listing_form.jsx');

var WebsitesList = React.createClass({
  getInitialState: function () {
    return ({websiteListings: WebsiteListingStore.all(), currentPage: 1});
  },

  websiteListingsChanged: function () {
    var self = this;
    self.setState({websiteListings: WebsiteListingStore.all()});
  },

  componentDidMount: function () {
    WebsiteListingStore.addChangedHandler(this.websiteListingsChanged);
    WebsiteListingStore.fetch(this.state.currentPage);
  },

  handleNextPageClick: function () {
    if (this.state.currentPage < 4) {
      this.setState({currentPage: (this.state.currentPage + 1)});
      WebsiteListingStore.fetch(this.state.currentPage + 1);
    }
  },

  handlePrevPageClick: function () {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: (this.state.currentPage - 1)});
      WebsiteListingStore.fetch(this.state.currentPage - 1);
    }
  },

  loadForm: function (e) {
    var id = parseInt(e.target.parentElement.children[0].innerHTML);
    var listing = WebsiteListingStore.find(id);
    console.log("listing: ", listing);
  },

  render: function () {
    var data = this.state.websiteListings;

    return(
      <div id="list">
        <button onClick={this.handlePrevPageClick}>Prev Page</button>
        <span> {this.state.currentPage} </span>
        <button onClick={this.handleNextPageClick}>Next Page</button>
        <ListingForm />
        <br></br>
        <Table className="table" data={data}
          sortable={true}
          filterable={['name', 'url', 'rank']}
          onClick={this.loadForm}
        />
      </div>
    )
  }
});

module.exports = WebsitesList;
