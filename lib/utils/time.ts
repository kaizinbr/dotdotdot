import { DateTime, Interval } from "luxon";

export function getFutureRelativeTime(date: Date, today: Date): string {
    const targetDateTime = DateTime.fromJSDate(date, {
        zone: "America/Sao_Paulo",
    }).plus({
        milliseconds: 1,
    });
    const todayDateTime = DateTime.fromJSDate(today, { zone: "America/Sao_Paulo" });
    const interval = Interval.fromDateTimes(todayDateTime, targetDateTime);
    const diffDays = interval.count("days") - 1;
    const diffHours = Math.floor(interval.length("hours"));
    const diffMinutes = Math.floor(interval.length("minutes"));

    if (diffDays > 0) return `${diffDays}d`;
    if (diffHours > 0) return `${diffHours}h`;
    if (diffMinutes > 0) return `${diffMinutes}m`;

    const diffDuration = todayDateTime.diff(targetDateTime, [
        "hours",
        "minutes",
    ]);
    if (diffDuration.hours > 0) return `-${Math.round(diffDuration.hours)}h`;
    if (diffDuration.minutes > 0)
        return `-${Math.round(diffDuration.minutes)}m`;
    return "Now";
}

export function getPastRelativeTime(date: Date, today: Date): string {
    const diff = today.getTime() - date.getTime();
    const diffMinutes = Math.floor(diff / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears === 1) return "Ano passado";
    if (diffYears > 0)
        return `${diffYears} ano${diffYears > 1 ? "s" : ""} atrás`;
    if (diffMonths === 1) return "Mês passado";
    if (diffMonths > 0)
        return `${diffMonths} mes${diffMonths > 1 ? "es" : ""} atrás`;
    if (diffWeeks === 1) return "Semana passada";
    if (diffWeeks > 0)
        return `${diffWeeks} semana${diffWeeks > 1 ? "s" : ""} atrás`;
    if (diffDays === 1) return "Ontem";
    if (diffDays > 0) return `${diffDays} dia${diffDays > 1 ? "s" : ""} atrás`;
    if (diffHours > 0)
        return `${diffHours} hora${diffHours > 1 ? "s" : ""} atrás`;
    if (diffMinutes > 0)
        return `${diffMinutes} minuto${diffMinutes > 1 ? "s" : ""} atrás`;
    return "Agora";
}

export function getShortPastRelativeTime(date: Date, today: Date): string {
    const diff = today.getTime() - date.getTime();
    const diffMinutes = Math.floor(diff / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return formatTimeAsDate(date);
    if (diffHours > 0) return `${diffHours}h`;
    if (diffMinutes > 0) return `${diffMinutes}m`;
    return "Now";
}

export function formatTimeAsDate(date: Date): string {
    const datetime = DateTime.fromJSDate(date, { zone: "America/Sao_Paulo" });
    return datetime.toFormat("dd/MM/yyyy");
}

export function formatTimeAsTime(date: Date): string {
    const datetime = DateTime.fromJSDate(date, { zone: "America/Sao_Paulo" });
    return datetime.toFormat("dd. MM. yyyy. HH:mm");
}

export function formatTimeAsSixDigit(date: Date): string {
    const datetime = DateTime.fromJSDate(date, { zone: "America/Sao_Paulo" });
    return datetime.toFormat("yyMMdd");
}

export function formatTimeAsDateJs(date: Date): string {
    const datetime = DateTime.fromJSDate(date, { zone: "America/Sao_Paulo" });
    return datetime.toFormat("yyyy-MM-dd");
}

export function formatTimeAsDateTimeJs(date: Date): string {
    const datetime = DateTime.fromJSDate(date, { zone: "America/Sao_Paulo" });
    return datetime.toFormat("yyyy-MM-dd'T'HH:mm");
}

export function getTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
}

export function parseVoyageDate(date: string): Date {
    const year = 2000 + Number(date.slice(0, 2));
    const month = Number(date.slice(2, 4)) - 1;
    const day = Number(date.slice(4, 6));
    return new Date(year, month, day);
}
