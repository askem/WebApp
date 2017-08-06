import React from 'react';

class AdPreview extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bottomActions : [
				'Like', 'React', 'Comment', 'Share', 'Like Page', 'Full Store',
				'Save', 'More'
			]
		}
	}

	render() {
		let preview;
		switch (this.props.adType) {
			case 'desktop_news_feed':
				preview = (
					<div>
						<div className="ad-creative-company-title">
							<img src="../images/color-logo.jpg" width="40" height="40"/>
							<div className="askem-title">askem</div>
							<div className="sponsered-text">sponsered</div>
						</div>
						<div className="creative-preview-headline">{ this.props.headlinePreview }</div>
						<div className="creative-preview-images">
							{ this.props.imagePreview === null && 
								<img src="../images/emptyMediaID.png"  style={{ width:'474px', height:'246px' }} />
							}

							{ this.props.imagePreview !== null && 
								<div style={{ backgroundImage:`url(${this.props.imagePreview})`, backgroundSize:'cover', width:'474px', height:'248px' }}></div>
							}
						</div>
						<div className="creative-preview-text">{ this.props.textPreview }</div>
						<div className="creative-preview-description">{ this.props.descriptionPreview }</div>
						<div className="askem-com-title">askem.com</div>
					</div>
				)
				break;
			case 'mobile_news_feed':
				preview = (
					<div className="mobile-news-feed-container">
						<div className="ad-creative-company-title">
							<img src="../images/color-logo.jpg" width="40" height="40"/>
							<div className="askem-title">askem</div>
							<div className="sponsered-text">sponsered</div>
						</div>
						<div className="creative-preview-headline-mobile-news-feed">{ this.props.headlinePreview }</div>
						<div className="creative-preview-images-mobile-news-feed">
							{ this.props.imagePreview === null && 
								<img src="../images/emptyMediaID.png"  style={{ width:'100%', height:'100%' }} />
							}

							{ this.props.imagePreview !== null && 
								<div style={{ backgroundImage:`url(${this.props.imagePreview})`, backgroundSize:'cover' , width:'298px', height:'156px'}}></div>
							}
						</div>
						<div className="creative-preview-text-mobile-news">{ this.props.textPreview }</div>
						<div className="creative-preview-description-mobile-news-feed">{ this.props.descriptionPreview }</div>
						<div className="bottom-askem">askem.com</div>
						<div className="mobile-news-footer">
							<div className="like">Like</div>
							<div className="comment">Coment</div>
							<div className="share">Share</div>
						</div>
					</div>
				)
				break;
			case 'feature_phone':
				preview = (
					<div className="featurephone-container">
					<div className="company-name">askem</div>
					<div className="creative-preview-headline-feature-phone">{ this.props.headlinePreview }</div>
					<div className="creative-preview-images-feature-phone">
						{ this.props.imagePreview === null && 
							<img src="../images/emptyMediaID.png"  style={{ width:'112px', height:'112px' }} />
						}

						{ this.props.imagePreview !== null && 
							<div style={{ backgroundImage:`url(${this.props.imagePreview})`, backgroundSize:'cover' , width:'112px', height:'112px'}}></div>
						}
						<div className="creative-preview-text-feature-phone">
							{ this.props.textPreview }
							<div className="askem">askem.com</div>
							</div>
					</div>
					<div className="bottom-actions">
						<ul className="bottom-actions-items">
							{ this.state.bottomActions.map((item, index) => {
								return (
									<li key={`id_${index}`} className="action-item">
										{ item }
										<span> · </span>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
				)
				break;
			case 'instant_articles':
				preview = (
					<div className="instant-articles-container">
						<div className="sponsered">sponsered</div>
						<div className="company-title">
							<img width="22" height="22" src="../images/color-logo.jpg" />
							<div className="company-name">askem</div>
							<div className="filler"></div>
							<div className="like-sign"></div>
						</div>
						<div>
							{ this.props.imagePreview === null && 
								<img src="../images/emptyMediaID.png"  style={{ width:'318px', height:'166px' }} />
							}

							{ this.props.imagePreview !== null && 
								<img src={ this.props.imagePreview } width="318px"/>
							}
							
						</div>

						<div className="headline">{ this.props.headlinePreview }</div>
						<div className="text">{ this.props.textPreview }</div>
						<div className="openlink">open link></div>
					</div>
				)	
				break;
			case 'desktop_right_column':
				preview = (
					<div className="desktop-right-column-container">
						{ this.props.imagePreview === null && 
							<img src="../images/emptyMediaID.png"  style={{ width:'254px', height:'133px' }} />
						}
						{ this.props.imagePreview !== null && 
							<img src={ this.props.imagePreview } width="254" height="133"/>
						}
						<div className="blue headline">
							<strong>{ this.props.headlinePreview }</strong>
						</div>
						<div className="blue">{ this.props.descriptionPreview }</div>

					</div>
				)
				break;
			case 'audience_network_banner':
				preview = (
					<div>
						<div className="audience-network-banner-container">				
							<div>
								<img src="../images/color-logo.jpg" alt="" width="50" height="50"/>
							</div>
							<div className="cards">
								<div className="card1">
									<div className="title">{ this.props.headlinePreview }</div>
									<div className="contextSentence">ASKEM.COM</div>
								</div>
								<div className="card2">
									<div className="title"></div>
									<div className="contextSentence"></div>
								</div>
								<div className="card3">{ this.props.textPreview }</div>
							</div>
							<div className="green-button">Open Link</div>
						</div>
						<div className="facebook-disclaimer"><p><b>Ads on the Audience Network are shown in third-party mobile apps and mobile websites.</b></p><p>Please note, this is only a preview. The ad may show up differently in other apps and websites.</p>Images may animate to reveal the entire image.</div>
					</div>
				)
				break;
			case 'audience_network_interstitial':
				preview = (
					<div className="audience-network-interstital-container">
						<div className="big-phone-container">
							<div className="mobile-container">
								<div className="mobile-background">
									<div className="mobile-border">
										{ this.props.imagePreview === null && 
											<img src="../images/emptyMediaID.png"  style={{ width:'100%', height:'216px' }} />
										}
										{ this.props.imagePreview !== null && 
											<div className="banner-row" style={{ backgroundImage : `url('${this.props.imagePreview}')` }}></div>
										}

										<div className="header-row">
											<div className="icon-row">
												<img src="../images/color-logo.jpg" alt="" height="64" width="64"/>
											</div>
											<div className="title-row">{ this.props.headlinePreview }</div>
											<div className="body-row">{ this.props.textPreview }</div>
											<div className="filler"></div>
											<div className="action-buttons-row">
												<div className="question-link">Open Link?</div>
												<div className="yes-wrapper">Yes</div>
												<div className="no-wrapper">No</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="facebook-disclaimer"><p><b>Ads on the Audience Network are shown in third-party mobile apps and mobile websites.</b></p><p>Please note, this is only a preview. The ad may show up differently in other apps and websites.</p>Images may animate to reveal the entire image.</div>
					</div>
				)	
				break;
			case 'audience_network_native':
				preview = (
					<div className="audience-network-native-container">
						<div className="phone-container">
							<div className="main-content">
								<div className="audience-newtwork-native-inner-container">
									<div className="preview-content">
										<img src="../images/color-logo.jpg" height="34" width="34"/>
										<div className="headline">{ this.props.headlinePreview }</div>
										<div className="sponsered">sponsered</div>
									</div>
									<div className="text">{ this.props.textPreview }</div>
									<div className="image-preview-container">
										{ this.props.imagePreview === null && 
											<img src="../images/emptyMediaID.png"  style={{ width:'346px', height:'180px' }} />
										}
										{ this.props.imagePreview !== null && 
											<img src={ this.props.imagePreview } alt="" width="346" height="180" className="image-position"/>
										}
										<div className="bottom-container">
											<div>ASKEM.COM</div>
											<div>
												<button>Open Link</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="facebook-disclaimer"><p><b>Ads on the Audience Network are shown in third-party mobile apps and mobile websites.</b></p><p>Please note, this is only a preview. The ad may show up differently in other apps and websites.</p>Images may animate to reveal the entire image.</div>
					</div>
				)
		}

		return(
			<div>
				{ preview }
			</div>
		)
	}
}

export default AdPreview;