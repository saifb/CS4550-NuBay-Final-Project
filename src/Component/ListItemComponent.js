import React from 'react'
import ImageGrid from './ImageGrid'
import PickImageComponent from './PickImageComponent'
import TextField from '@material-ui/core/TextField';
import ItemService from '../services/ItemService'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    overrides: {
        MuiInputLabel: {
            root: {
                color: "black",
                "&$focused": {
                    color: "black"
                }
            }
        },
        MuiInput: {
            underline: {
                '&:hover:not($disabled):after': {
                    borderBottom: `2px solid black`
                },
                '&:hover:not($disabled):before': {
                    borderBottom: `2px solid black`,
                },
                '&:after': {
                    borderBottom: `2px solid black`
                }
            }
        }
    }
});

class ListItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.nuBayService = ItemService.getInstance()
        this.state = { pictures: [],images:[],images2:[],
        item:{
            title:'',
            description:'',
            value:'',
            quantity:'',
            conditionString:'',
            location:'',
            paymentOptions:'',
            categoryName:'',
            refundPolicy: '',
            base64Image:''



        }};
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
		this.fileUploadedDone = this.fileUploadedDone.bind(this);
		this.getByteArrayFromImage = this.getByteArrayFromImage.bind(this)
		this.onImageDelete = this.onImageDelete.bind(this);
		this.itemSubmit = this.itemSubmit.bind(this);


    }

    onImageDelete(selectedIndex) {

        this.setState(prevState => ({
            ...prevState,
            editingPhoto: prevState.editingPhoto == prevState.images[this.selectedIndex] ? null :
                prevState.editingPhoto,
            pictures: prevState.pictures.filter((picture, index) => selectedIndex != index),
            images: prevState.images.filter((picture, index) => selectedIndex != index)


        }))

    }

callBack(json) {
debugger;
}

itemSubmit() {
    this.nuBayService.createItemForUser("151", this.state.item, this.callBack)

}



 fileUploadedDone(fileReader) {

    var fileByteArray = [];
  var arrayBuffer = fileReader.srcElement.result,
            array = new Uint8Array(arrayBuffer);
        for (var i = 0; i < array.length; i++) {
            fileByteArray.push(array[i]);
         }
    this.setState(prevState => ({
    ...prevState,
    item :{
        ...prevState.item,
        image1: fileByteArray
    }
    }

    ))
 }


 getByteArrayFromImage(file) {
    var fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.addEventListener("load",this.fileUploadedDone)
    }


    itemTitleChanged = (event) => {
    event.persist()
  		this.setState(prevState => ({
  		    ...prevState,
  			item: {
            ...prevState.item,
  				title: event.target.value
  			}
  		}))
}

conditionStringChanged = (event) => {
    event.persist()
  		this.setState(prevState => ({
  		    ...prevState,
  			item: {
            ...prevState.item,
  				conditionString: event.target.value
  			}
  		}))
}

quantityChanged = (event) => {
    event.persist()
     this.setState(prevState => ({
       ...prevState,
       item: {
       ...prevState.item,
        quantity: event.target.value
     }
    }))
                }


    descriptionChanged = (event) => {
    event.persist()
         this.setState(prevState => ({
           		    ...prevState,
           			item: {
                     ...prevState.item,
           			description: event.target.value
           			}
           		}))
         }

    refundPolicyChanged = (event) => {
    event.persist()
    this.setState(prevState => ({
               		    ...prevState,
               			item: {
                         ...prevState.item,
               			refundPolicy: event.target.value
               			}
               		}))
    }

    pricingChanged = (event) => {
        event.persist()
        this.setState(prevState => ({
                   		    ...prevState,
                   			item: {
                             ...prevState.item,
                   			value: event.target.value
                   			}
                   		}))
    }
    shippingChanged = (event) => {
            event.persist()
            this.setState(prevState => ({
              ...prevState,
              item: {
                ...prevState.item,
                price: event.target.value
              }
            }))
        }

    paymentMethodAdded = (event, values) => {
        event.persist()
        var paymentMethodString = ""
        values.map((item, index) => {
            if (index != (values.length - 1)) {
               paymentMethodString = paymentMethodString.concat(item["paymentMethod"] + ", ")
            }
            else {
           paymentMethodString = paymentMethodString.concat(item["paymentMethod"])
            }
        })
        this.setState(prevState => ({
            ...prevState,
            item :{
                ...prevState.item,
                paymentOptions: paymentMethodString

            }
            }
        ))
    }

    addCategories = (event, values) => {
           event.persist()
           var categoryString = ""
           values.map((item, index) => {
             if (index != (values.length - 1)) {
                categoryString = categoryString.concat(item["categoryName"] + ", ")
            }
             else {
                categoryString = categoryString.concat(item["categoryName"])
             }
             })
             this.setState(prevState => ({
                  ...prevState,
                   item :{
                     ...prevState.item,
                     categoryName: categoryString

                                }
                                }
                            ))
                        }







    onImageDelete(selectedIndex) {
        debugger;
        this.setState(prevState => ({
            ...prevState,
            pictures: prevState.pictures.filter((picture, index) => selectedIndex != index),
            images: prevState.images.filter((picture, index) => selectedIndex != index)
        }))

    }


    fileSelectedHandler = event => {
        event.persist()
        this.getByteArrayFromImage(event.target.files[0])
        this.setState(prevState => ({
                    images: [...prevState.images, URL.createObjectURL(event.target.files[0])],

                }))
    }


    render() {
        return (
            <div>
                <div className="row mt-3 thickBorderBottom">
                    <div className="container">
                        <h2> List Your New Item </h2>
                    </div>
                </div>
                <div className="container mt-4">

                    <form>
                        <div className="row border-bottom mt-2">
                            <div className="col-8">
                                <h4> What is the name of your product? </h4>
                            </div>

                        <div className="form-group float-left col-12">
                            {/*<label htmlFor="title" className="col-form-label float-left">*/}
                            {/*    Product Name </label>*/}
                            <input className="form-control" id="title" value={this.state.item.title}
                            onChange={this.itemTitleChanged}
                                   placeholder="Product Title"/>
                        </div>

                    </div>
                    <div className="row border-bottom mt-2">
                                            <div className="col-8">
                                                <h4> What is the condition of your product? </h4>
                                            </div>

                                            <div className="form-group float-left col-12">
                                                {/*<label htmlFor="title" className="col-form-label float-left">*/}
                                                {/*    Product Name </label>*/}
                                                <input className="form-control" id="title"
                                                value={this.state.item.conditionString}
                                                onChange={this.conditionStringChanged}
                                                       placeholder="Condition String"/>
                                            </div>

                                        </div>
                    <div className="row border-bottom mt-2">
                        <div className="col-8">
                            <h4> Describe Your Product </h4>
                            </div>
                    <div className="form-group float-left col-12">
                        <textarea className="form-control" id="item-description"
                        value={this.state.item.description}
                        onChange={this.descriptionChanged}
                        placeholder="Limit to 2 sentences"></textarea>
                    </div>
                    </div>
                        <div className="row border-bottom mt-2">
                            <div className="col-8">
                                <h4> Pricing </h4>

                            </div>
                            <div className="form-group col-12">

                            <label htmlFor="item-cost" className="col-form-label float-left">
                                Item Cost </label>
                            <input className="form-control" id="item-cost"
                                   placeholder="$34"
                                   value={this.state.item.value}
                                   onChange={this.pricingChanged}/>


                            </div>

                        <div className="form-group col-12">

                            <Autocomplete
                                multiple
                                onChange={this.paymentMethodAdded}
                                id="payment-options"
                                options={[{"paymentMethod": "Venmo", "id": 1},
                                    {"paymentMethod": "PayPal", "id": 2},
                                    {"paymentMethod": "CashApp", "id": 3}]}
                                getOptionLabel={option => option.paymentMethod}
                                classes={{input: 'AutoCompleteBlack', inputFocused: 'AutoCompleteBlack'}}
                                renderInput={params => (
                                    <ThemeProvider theme={theme}>
                                    <TextField
                                        {...params}
                                        variant="standard"

                                        label="Available Payment Methods"
                                        placeholder="payment methods"
                                        margin="normal"
                                        fullWidth
                                    />
                                    </ThemeProvider>
                                )}/>

                            </div>
                        </div>
                        <div className="row border-bottom mt-2">
                            <div className="col-8">
                                <h4> Categories </h4>

                            </div>
                            <div className="form-group col-12 mt-0">
                                <Autocomplete
                                    className="w-100 mt-0"
                                    multiple
                                    id="category-selector"
                                    options={[{"categoryName": "Sports", "id": 1},
                                        {"categoryName": "Clothing", "id": 2},
                                        {"categoryName": "Clothing123", "id": 3}]}
                                    getOptionLabel={option => option.categoryName}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Categories"
                                            placeholder="categories"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}/>
                            </div>
                        </div>
                        <div className="row mt-2 border-bottom">
                                                    <div className="col-8">
                                                        <h4> Quantity </h4>

                                                    </div>

                                                <div className="form-group col-12">
                                                <input className="form-control" id="item-quanity"
                                                            placeholder="4"
                                                            value={this.state.item.quantity}
                                                            onChange={this.quantityChanged}/>
                           </div>
                        </div>
                        <div className="row border-bottom mt-2">
                            <div className="col-8">
                                <h4> Refund Policy </h4>

                            </div>

                        <div className="form-group col-12">
                            <textarea className="form-control" id="refund-policy"
                            value={this.state.item.refundPolicy}
                            onChange={this.refundPolicyChanged}
                            placeholder="Describe your refund policy"></textarea>
                        </div>
                        </div>

                        <div className="row">
                            <div className="col-8">

                                <h4> Add Photos </h4>
                            </div>
                            <div className="col-8">
                                <span> Add up to 3 photos of your product </span>
                            </div>
                            <div className="col-12">
                                <ImageGrid images={this.state.images} onDrop={this.fileSelectedHandler}
                                           onImageDelete={this.onImageDelete}/>
                            </div>
                        </div>
                        <div className="container mt-2 mb-2">
                            <div className="row">
                                <button type="button" onClick = {this.itemSubmit}
                                className="btn btn-success btn">List Item</button>
                                <button type="button" className="ml-2 btn btn-danger btn">Delete Listing</button>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}

export default ListItemComponent