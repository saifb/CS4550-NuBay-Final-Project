import React, { Fragment } from 'react'
import NuBayService from '../services/NuBayService'
import ImageCarosel from './ImageCarosel'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Constants from '../constants/constants';
import ItemCard from './ItemCard'
import StarRatings from 'react-star-ratings';



class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.nuBayService = NuBayService.getInstance()
        this.setItem = this.setItem.bind(this);
        this.setRelatedItems = this.setRelatedItems.bind(this);
        this.constants = Constants.getInstance()
        this.responsive = {
               superLargeDesktop: {
                 // the naming can be any, depends on you.
                 breakpoint: { max: 4000, min: 3000 },
                 items: 5,
               },
               desktop: {
                 breakpoint: { max: 3000, min: 1024 },
                 items: 5,
               },
               tablet: {
                 breakpoint: { max: 1024, min: 464 },
                 items: 3,
               },
               mobile: {
                 breakpoint: { max: 464, min: 0 },
                 items: 3,
               },
             }

        this.state = {
        item: {
              },
        relatedItems: []

        }

        if(props.match) {

        this.nuBayService.getEbayItemById(props.match.params.id, this.setItem)
}
    }

    setItem(item) {
    debugger;
    this.nuBayService.getEbayItemByCategory(item.categoryId, this.setRelatedItems)
        this.setState(prevState => ({
          ...prevState,
          item: item
        }))
      }

    setRelatedItems(items) {
    debugger;
    this.setState(prevState => ({
              ...prevState,
              relatedItems: items
            }))
    }

    render() {
        return (
            <div class="container-fluid">
                <div className="row">
                    <button
                        className="btn btn-secondary"
                        onClick={() => { this.props.setItemIdFunc(0) }}
                    >
                        Back to List
                        </button>

                </div>
                <div className="row">
                    <div className="col-5 h-25 mh-25">
                    <div className="row detail-image">
                    <div className="col-12 h-100">
                        <ImageCarosel images={this.state.item.imageUrl ? this.state.item.imageUrl
                        : []} />
                        </div>
                        </div>
                    <div className="row mt-3">
                    <div className="col-10">
                    <div className="mb-1">
                    <b className="more-details-font"> More Details </b>
                    </div>
                    <div>
                     <ul>
                     <li className="more-detail-items"> {this.state.item.refundPolicy} </li>
                     <li className="more-detail-items"> Payment Methods Accepted:
                    {this.state.item.paymentOptions ? this.state.item.paymentOptions.map((option,index) =>{return(
                    index != 0 ? " ,".concat(option) :  " ".concat(option)


                    )}):
                    "None"}</li>
                     <li className="more-detail-items"> Shipped From: {this.state.item.location} </li>
                     </ul>

                    </div>
                    </div>
                    </div>
                    </div>

                    <div className="col-7">
                    <div className="col-12">
                        <div className="item-detail-next-to-image">
                            <b className="item-detail-name">{
                            this.state.item.title ? this.state.item.title : "" } </b>
                        </div>
                        </div>
                         <div className="col-12 mt-2">
                                                    <span className="item-categories"> {this.state.item.categoryName} </span>
                                                </div>
                        <div className="col-12 ml-0">
                          <span>
                           <a href="#">
                         <span className="seller-link text-dark">
                           {this.state.item.sellerId}
                           </span>
                              </a>
                              <StarRatings className="price-stars"
                                                              rating={5.0}
                                                              starRatedColor="gold"
                                                              numberOfStars={5}
                                                              starDimension='20px'
                                                              name='rating'
                                                              starSpacing='2px'
                                                            />
                                                 </span>
                                                 </div>



                        <div className="col-12 mt-2">
                                                          <span>
                                                      <b className="item-condition-detail">
                                                         {this.state.item.conditionString}
                                                         </b>
                                                           </span>
                                                   </div>
                         <div className="col-12 mt-1">
                                                   <span>

                                                   <b className="item-quantity-detail">
                                                    {this.state.item.quantity} Left
                                                      </b>
                                                   </span>
                                                    </div>
                        <div className="col-12 mt-3">
                                                <span>

                                                <b className="item-detail-price">
                                                {this.state.item.value ? this.constants.getItemPrice(this.state.item.value)
                                                : ""}</b>
                                                 <b className="ml-2 item-detail-shipping-cost"> Free Shipping </b>

                                                 </span>
                                                </div>




                        <div className="col-12 mt-3">
                         <span className="description-text">  {this.state.item.description} </span>
                        </div>


                        <div className="row mt-4 container-fluid">
                        <div className="col-8 ml-0">
                        <button type="button" className="btn btn-success w-100">Buy Now on eBay</button>
                        </div>
                        <div className="col-8 ml-0 mt-3">
                       <button type="button" className="btn btn-warning w-100">Add to Cart</button>
                       </div>
                        </div>
                        </div>

                </div>

                <div className ="row h-25 w-100">
                <div className ="col-12 mt-3 mb-3">
                <b class="view-related-items-font"> View Related Items </b>

                </div>
                <div className="col-12 h-100 w-100">
                    <Carousel responsive={this.responsive}>
                      {this.state.relatedItems.map((item) => {
                         return(
                            <div>
                            <ItemCard
                            item={item}
                            />
                            </div>
                        ) }
                         )

                      }
                    </Carousel>
                </div>
               </div>

            </div>
        )

    }
}

export default ItemDetail