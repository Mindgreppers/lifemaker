'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React

var styles = StyleSheet.create({
  ssCategoryHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  ssCategoryText: {
    textAlign: 'center',
    fontSize: 16
  },
  ssTypeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  ssType: {
    flex: 1,
    height: 120,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    opacity: 0.5,
  },
  highlight: {
    opacity: 1,
  },
  commentActionCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagView : {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#ffffff'
  },
  closeButton: {
    flex: 1
  },
  dropDownDuration: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  createButton: {
    marginRight: 40,
  },
  dropdown: {
    height: 20,
    width: 200,
    marginTop: 20,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    marginRight: 5,
  },
  days: {
    fontSize: 17,
  },
  liveSS: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  loading: {
    position: 'absolute',
  },
  liveSSTitle: {
    flex: 1
  },
  loadingView: {
  },
  selectBox: {
    width: 195,
    padding: 10,
  },
  selectButton: {
    height: 40,
    width: 195,
    paddingLeft: 5,
    paddingTop: 15,
    marginTop: 23.5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tag: {
    fontSize: 10,
  },
  tagButton: {
    padding: 4,
    backgroundColor: '#A2A3A1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  checkBoxButton: {
    marginLeft: 36,
    marginTop: 10,
    marginBottom: 10
  },
  checkBoxView: {
    flexDirection: 'row'
  },
  checkBoxLabel: {
    marginLeft: 10
  },
  commentStyle: {
    flexDirection: 'row',
  },
  submitComment: {
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  commentInputView: {
    flexDirection: 'row'
  },
  commentButton: {
    flex: 1,
    marginLeft: 133,
    marginTop: 10
  },
  commentText: {
    color: '#26a29a'
  },
  searchBar: {
    height: 40,
    width: 218,
    marginLeft: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  sort: {
    marginLeft: 187,
  },
  filter: {
    marginLeft: 13,
  },
  thanksButton: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  DrawerView: {
    backgroundColor: '#ffffff',
  },
  DrawerHeading: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  DrawerSmokeSignals: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  DrawerHeadingText: {
    color: '#000000',
    fontSize: 20,
    marginLeft: 20,
  },
  modal4: {
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  interestView:  {
    height:  40,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth:  0.5,
    borderTopColor: '#f0f0f0',
    borderTopWidth:  1,
    borderLeftColor: '#f0f0f0',
    borderRightColor: '#f0f0f0',
    borderLeftWidth:  1,
    borderRightWidth:  1,
    alignItems: 'center',
    paddingLeft:  10,
    paddingRight:  10,
    flexDirection: 'row',
  },
  close:  {
    height:  15,
    width:  15,
    color: 'black',
  },
  interestPageTitle:  {
    textAlign: 'center',
    fontSize:  20,
    color: 'rgb(15, 119, 119)',
  },
  deleteInterest:  {
    //textAlign: 'right',
  },
  listViewInterests:  {
    marginTop:  50,
    height:  100,
    borderWidth:  2,
    borderColor: 'gray',
  },

  fab:  {
    width:  60,
    height:  60,
    borderRadius:  30,
  },
  createSmoke: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerBar:  {
    top: 0,
    left: 0,
    right: 0,
    height:  56,
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop:  1,
  },
  menuButton:  {
    width: 25,
    marginRight: 10,
    height: 25,
  },
  searchButton: {
    width: 25,
    marginLeft: 10,
    height: 25,
  },
  notificationButton:  {
    width: 25,
    marginLeft: 10,
    height: 25,
  },
  icon:  {
    width: 20,
    height: 20,
  },
  sendSmoke:  {
    backgroundColor: '#26a69a',
    borderRadius: 28,
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 120,
  },
  loginField:  {
    marginTop: 30,
    marginLeft: 3,
  },
  submitRegistration: {
    backgroundColor: '#26a69a',
    borderRadius: 28,
    marginTop: 40,
    marginBottom: 120,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button : {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendSmokeButton:  {
    width: 120,
    height: 80,
  },
  addSmokeText:  {
    fontSize: 30,
    lineHeight: 60,
  },
  addSmokeView:  {
    backgroundColor: '#ee6e73',
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  addSmoke:  {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  submitInterests:  {
    backgroundColor: '#2bbbad',
    borderRadius: 28,
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileEditButton:  {
    backgroundColor: '#26a69a',
    borderRadius: 28,
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    marginLeft: 5,
  },
  smokeSignalsScroll:  {
    height: 120,
  },
  newThreadField:  {
    marginTop: 10,
  },
  radioButton:  {
    marginTop: 20,
  },
  profileEditFields:  {
    marginLeft: 3,
    marginTop: 30,
  },
  editProfilePic:  {
    textAlign: 'right',
    marginBottom: 20,
  },
  profileEditImage:  {
    textAlign: 'right',
    marginLeft: 220,
  },
  profileEditInput:  {
    color: '#26a69a',
  },
  profileImageContainer:  {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  edit:  {
    width: 25,
    height: 25,
    marginLeft: 250,
  },
  profileText:  {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },
  profileButtonText: {
    color: '#26a69a',
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: 'gray',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  profileImageText: {
    fontSize: 60,
    marginTop: -5,
    color: '#ffffff'
  },
  editImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.5,
  },
  appName:  {
    fontSize:  20,
    color: '#ffffff',
  },
  smokeIcon:  {
    width: 25,
    height: 25,
  },
  smokeIconButton:  {
    marginLeft: 30,
  },
  menuIcon:  {
    width: 25,
    height: 21,
  },
  menuIconButton:  {
    marginRight: 100,
    marginLeft: -50,
  },
  navBar:  {
    backgroundColor: '#ee6e73',
    top: 0,
    left: 0,
    right: 0,
    height:  50,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop:  1,
  },
  userKarma:  {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo:  {
    width: 277,
    height: 277,
  },
  scrollView:  {
    height: 1000,
  },
  container:  {
    backgroundColor: '#ffffff',
    borderWidth:  1,
    borderColor: '#f0f0f0',
    margin: 20,
    padding: 20,
  },
  interestPageContainer: {
    backgroundColor: '#ffffff',
    borderWidth:  1,
    borderColor: '#f0f0f0',
    margin: 20,
    padding: 20,
    alignItems: 'center'
  },
  welcome:  {
    fontSize:  20,
    textAlign: 'center',
    margin:  10,
  },
  instructions:  {
    textAlign: 'center',
    color: '#333333',
    marginBottom:  5,
  },
  title:  {
    fontSize:  20,
    textAlign: 'left',
    color: '#000000',
  },
  PageTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  titleView: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tags:  {
    textAlign: 'left',
    color: '#26a69a',
    marginTop:  5,
    marginBottom: 10,
  },
  showMore:  {
    color: '#26a69a',
  },
  reply:  {
    color: '#26a69a',
    textAlign: 'right',
    marginTop: 20,
  },
  description:  {
    fontSize: 15,
    marginTop: 10,
    color: '#000000',
    textAlign: 'left',
    marginBottom: 20,
  },
  beer:  {
    height: 100,
    width: 100,
  },
  label:  {
    marginTop: 20,
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 20,
  },
  upvoteLabel:  {
    justifyContent: 'center',
    width: 90,
    height: 40,
  },
  downvoteLabel:  {
    marginLeft: 95,
    justifyContent: 'center',
    width: 90,
    height: 40,
    marginTop: -23,
  },
  replyLabel:  {
    marginTop: -40,
    marginLeft: 160,
    justifyContent: 'center',
    width: 90,
    height: 40,
  },
  showMoreButton:  {
    marginLeft: 200,
    justifyContent: 'center',
    width: 90,
    height: 40,
    marginBottom: 10,
  },
  commentAction:  {
    color: '#26a69a',
  },
  commentActionButton: {
    flex: 1
  },
  thanks: {
    color: '#26a69a',
    textAlign: 'left'
  },
  nothanks: {
    color: '#26a69a',
    textAlign: 'right',
    marginLeft: 40,
  },
  timeInfoText:  {
    textAlign: 'center',
    marginTop: 5,
  },
  labelText:  {
    color: '#26a69a'
  },
  comments:  {
    textAlign: 'left',
    color: '#000000',
    marginTop: 10,
    fontSize: 13,
  },
  downvote:  {
    marginTop: -39,
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 20,
    marginLeft:  192,
    marginBottom: 10,
  },
  listView: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  smokeSignal:  {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderColor: '#f0f0f0',
    borderWidth: 1,
  },
  ssCategory: {
    color: '#ffffff',
    borderColor: '#f0f0f0',
    borderWidth: 1,
    width: 80,
    textAlign: 'center',
    alignSelf: 'flex-end'
  },
  comment:  {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
});
module.exports = styles
