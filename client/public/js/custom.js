  // Nice scroll for course detail chat
  $(function() {  
                $(".direct-chat-messages").niceScroll();
            });

  // for calendar page
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      initialDate: '2022-11-03',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          title: 'Session 1',
          start: '2022-11-01'
          
        },
        {
          title: 'Session 2',
          start: '2022-11-05'
        },
        {
          //groupId: 999,
          title: 'Session 3',
          start: '2022-11-07T16:00:00'
        },
        {
          //groupId: 999,
          title: 'Session 4',
          start: '2022-11-09T16:00:00'
        },
        {
          title: 'Session 5',
          start: '2022-11-11'
        },
        {
          title: 'Session 6',
          start: '2022-11-12T10:30:00'
        },
        {
          title: 'Session 7',
          start: '2022-11-15T12:00:00'
        },
        {
          title: 'Session 8',
          start: '2022-11-17T14:30:00'
        },
        {
          title: 'Session 9',
          start: '2022-11-19T17:30:00'
        },
        {
          title: 'Session 10',
          start: '2022-11-20T20:00:00'
        },
        {
          title: 'Session 11',
          start: '2022-11-22T07:00:00'
        },
        {
          title: 'Session 12',
          start: '2022-11-25'
        }
      ]
    });

    calendar.render();
  });