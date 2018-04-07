import React, { Component } from 'react';
import {Row,Col,Button} from 'react-bootstrap'
class App extends React.Component {
	constructor(){
  	super()
    this.state = {
			roomsInfo:[],
			updatedRoomsInfo:[],
			numberOfAdults:1,
			numberOfChildren:0
    }
  }

  handleRoomSelection(selectedRoom,isSelected){
			let updatedRoomsInfo = this.state.updatedRoomsInfo
			if(isSelected){
				for(let i in updatedRoomsInfo){
					if(updatedRoomsInfo[i].room <= selectedRoom){
						updatedRoomsInfo[i].isSelected = true
					}

				}
			}else{
				for(let i in updatedRoomsInfo){
					if(updatedRoomsInfo[i].room >= selectedRoom){
						updatedRoomsInfo[i].isSelected = false
						updatedRoomsInfo[i] = this.state.roomsInfo[i]
					}
				}
			}
			for(let j in updatedRoomsInfo){
				if(updatedRoomsInfo[j].room == selectedRoom){
						this.setState({
							numberOfAdults:updatedRoomsInfo[j].adults,
							numberOfChildren:updatedRoomsInfo[j].children
						})
				}
			}
      this.setState({
				updatedRoomsInfo,
      })
  }

	componentDidMount(){
		fetch('https://hiltonhotels-37f72.firebaseio.com/rooms.json')
		.then((res)=>{
			return res.json()
		})
		.then((resJson)=>{
				let formattedRooms = []
				resJson.forEach((eachRoom)=>{
					formattedRooms.push({room:eachRoom.room,adults:eachRoom.adults,children:eachRoom.children,isSelected: false})
				})
				this.setState({
					roomsInfo: JSON.parse(JSON.stringify(formattedRooms)),
					updatedRoomsInfo: JSON.parse(JSON.stringify(formattedRooms))
				})
		})
	}

	handleSubmit(){
		fetch('https://hiltonhotels-37f72.firebaseio.com/rooms.json', {
		  method: 'PUT',
		  body: JSON.stringify(this.state.updatedRoomsInfo),
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response))
	}

	handleRoomUpdate(roomToUpdate,typeofUpdate,updateTo){
		var updatedRoomsInfo = this.state.updatedRoomsInfo
		for(var key in updatedRoomsInfo){
			if(updatedRoomsInfo[key].room == roomToUpdate){
						updatedRoomsInfo[key][typeofUpdate] = Number(updateTo)
			}
		}

		this.setState({
				updatedRoomsInfo
		})

	}

  render() {
    console.log("This State",this.state)
    return (
			<div  style={{marginLeft:'50px',marginTop:'100px'}}>
	    	<Row>
					<Col md={1} style={{border:'2px solid lightgrey',marginRight:'2%'}}>
							<Row style={{backgroundColor:'lightgrey'}}>
									<span style={{fontWeight:'bold',fontSize:'15px'}}>Room 1</span>
							</Row>
							<Row>
								<Col md={4}>
										<Row>
											Adults (18+)
										</Row>
										<Row>
											<select value={this.state.numberOfAdults} onChange={(e)=>{this.setState({numberOfAdults:Number(e.target.value)})}}>
												<option value={1}>1</option>
												<option value={2}>2</option>
											</select>
										</Row>
									</Col>
									<Col md={8}>
											children (0-17)
											<select value={this.state.numberOfChildren} onChange={(e)=>{this.setState({numberOfChildren:Number(e.target.value)})}}>
												<option value={0}>0</option>
												<option value={1}>1</option>
												<option value={2}>2</option>
											</select>
										</Col>
							</Row>
						</Col>

					{
						this.state.updatedRoomsInfo.map((eachItem,i) =>{
							return(
								<Col md={1} style={{border:'2px solid lightgrey',marginRight:'2%',backgroundColor:eachItem.isSelected ? 'white':'#DBDBE3'}} key={eachItem.room}>
				         	<Row style={{backgroundColor:eachItem.isSelected ? 'lightgrey':'#DBDBE3'}}>
				            <input type="checkbox" checked={eachItem.isSelected} onChange={(e)=>{this.handleRoomSelection(eachItem.room,e.target.checked)}}/>
										<span style={{fontWeight:'bold',fontSize:'15px',marginLeft:'10px'}}>Room {eachItem.room} </span>
				          </Row>
				          <Row style={{marginBottom:'10%'}}>
				              <Col md={4}>
				                  <span style={{fontSize:'15px'}}>Adults (18+)</span>
													<select disabled={!eachItem.isSelected} value={eachItem.adults} onChange={(e)=>{this.handleRoomUpdate(eachItem.room,'adults',e.target.value)}}>
														<option value={1}>1</option>
														<option value={2}>2</option>
													</select>
				              </Col>
				                <Col md={8}>
				                    <span style={{fontSize:'15px',marginLeft:'5px'}}>children (0-17)</span>
				                    <select disabled={!eachItem.isSelected} value={eachItem.children} onChange={(e)=>{this.handleRoomUpdate(eachItem.room,'children',e.target.value)}}>
				                     <option>0</option>
				                     <option>1</option>
				                    <option>2</option>
				                  </select>
				                </Col>
				          </Row>
				    	  </Col>
							)
						})
					}
	    	</Row>
				<Row>
					<div style={{marginTop:'20px'}}>
						<button onClick={()=>{this.handleSubmit()}}> submit </button>
					</div>
				</Row>
			</div>
    )
  }
}

module.exports = App
