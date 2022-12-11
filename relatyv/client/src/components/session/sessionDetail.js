
import Sidebar from "../sidebar/sidebar"
const SessionDetail = () => {
    return (
        <div class="main-content">
            <div class="d-lg-flex">
                <Sidebar />
                <div class="content-area py-4 p-lg-4 w-100 bg-light">
                    <div class="container">
                        <h3 class="mb-2 h3">Fibromyalgia Course</h3>
                        <p>Over four-million people in the United States suffer from the condition of fibromyalgia, a condition that causes widespread pain and irritation in targeted points of the body usually in the back and arms.</p>
                        <section class="live-streaming mt-4">
                            <div class="row m-0">
                            <div class="col-md-8 p-0">
                                <div id="video-stream" class="live-video-playing">
                                <video width="100%" poster="images/is-fibromyalgia-treatable.jpg" controls>
                                    <source src="video/sample-video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                </div>
                            </div>
                            <div id="grpChatSection" class="col-md-4 p-0">
                                <div class="chat-system aaaaa">
                                    <div class="shadow">
                                        <div class="box box-warning direct-chat direct-chat-warning">
                                        <div class="frame-header py-2 px-3 d-flex justify-content-between align-items-center">
                                            <div class="agent-online">
                                                <div class="list-chat">Live Chat</div>
                                            </div>
                                        </div>
                                        <div class="box-body group-chat">
                                            <div id="channelChat" class="direct-chat-messages">
                                                <div class="direct-chat-msg right">
                                                    <div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">You</span><span class="direct-chat-timestamp pull-left">08:9 pm, 02 Nov 2022</span></div>
                                                    <img class="direct-chat-img" src="images/person-female.png" alt="message user image" />
                                                    <div class="direct-chat-text aaa">Hi</div>
                                                </div>
                                                <div class="direct-chat-msg">
                                                    <div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">Jaiveer</span><span class="direct-chat-timestamp pull-right">08:9 pm, 02 Nov 2022</span></div>
                                                    <img class="direct-chat-img" src="images/administrator-male.png" alt="message user image" />
                                                    <div class="direct-chat-text bbb">Hello</div>
                                                </div>
                                                <div class="direct-chat-msg">
                                                    <div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">Jaiveer</span><span class="direct-chat-timestamp pull-right">08:9 pm, 02 Nov 2022</span></div>
                                                    <img class="direct-chat-img" src="images/administrator-male.png" alt="message user image" />
                                                    <div class="direct-chat-text bbb">Let's start</div>
                                                </div>
                                            </div>
                                        </div>
                                            <div class="box-footer qqqqqq">
                                                <div class="input-group">
                                                    <input id="localChannelMsg" type="text" name="message" placeholder="Type Message..." class="form-control" />
                                                    <span class="input-group-btn">
                                                    <button id="sendChannelMsg" type="button" class="btn btn-warning btn-flat">Send</button>
                                                    </span>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h2 class="mb-2 h4 mt-3">Session 1</h2>
                                <p class="mb-0 small">United States suffer from the condition of fibromyalgia, a condition that causes widespread pain and irritation in targeted points of the body usually in the back and arms.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionDetail